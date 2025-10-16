import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class SearchController {

	//region Global Search
	async globalSearch(req: Request, res: Response) {
		const query = req.query.q as string;
		const type = req.query.type as string; // 'albums', 'artists', 'tracks', 'all'
		const limit = parseInt(req.query.limit as string) || 20;
		const offset = parseInt(req.query.offset as string) || 0;

		if (!query || query.trim() === "") {
			return Errors.badRequest(res, 'search');
		}

		try {
			const results: any = {
				albums: [],
				artists: [],
				tracks: [],
				total: 0
			};

			// Search albums
			if (type === 'all' || type === 'albums') {
				const albums = await prisma.album.findMany({
					where: {
						OR: [
							{ album_name: { contains: query } },
							{ description: { contains: query } },
							{ catalog_number: { contains: query } }
						]
					},
					include: {
						artists: {
							include: {
								artist: true
							}
						},
						genre: true,
						label: true
					},
					take: limit,
					skip: offset
				});
				results.albums = albums;
			}

			// Search artists
			if (type === 'all' || type === 'artists') {
				const artists = await prisma.artist.findMany({
					where: {
						OR: [
							{ artist_name: { contains: query } },
							{ real_name: { contains: query } },
							{ biography: { contains: query } }
						]
					},
					include: {
						albums: {
							include: {
								album: {
									include: {
										genre: true,
										label: true
									}
								}
							}
						}
					},
					take: limit,
					skip: offset
				});
				results.artists = artists;
			}

			// Search tracks
			if (type === 'all' || type === 'tracks') {
				const tracks = await prisma.track.findMany({
					where: {
						title: { contains: query }
					},
					include: {
						album: {
							include: {
								artists: {
									include: {
										artist: true
									}
								},
								genre: true,
								label: true
							}
						}
					},
					take: limit,
					skip: offset
				});
				results.tracks = tracks;
			}

			// Calculate total
			results.total = results.albums.length + results.artists.length + results.tracks.length;

			res.status(200).send({
				message: `Search results for '${query}'`,
				query,
				type,
				results
			});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'search', error);
		}
	}
	//endregion

	//region Advanced Album Search
	async advancedAlbumSearch(req: Request, res: Response) {
		const {
			title,
			artist,
			genre,
			label,
			yearFrom,
			yearTo,
			sortBy = 'album_name',
			sortOrder = 'asc',
			limit = 20,
			offset = 0
		} = req.query;

		try {
			let whereClause: any = {};

			// Title filter
			if (title) {
				whereClause.album_name = { contains: title as string };
			}

			// Artist filter
			if (artist) {
				whereClause.artists = {
					some: {
						artist_name: { contains: artist as string }
					}
				};
			}

			// Genre filter
			if (genre) {
				whereClause.genre = {
					genre: { contains: genre as string }
				};
			}

			// Label filter
			if (label) {
				whereClause.label = {
					label_name: { contains: label as string }
				};
			}

			// Year range filter
			if (yearFrom || yearTo) {
				whereClause.release_year = {};
				if (yearFrom) whereClause.release_year.gte = parseInt(yearFrom as string);
				if (yearTo) whereClause.release_year.lte = parseInt(yearTo as string);
			}

			// Sort options
			const orderBy: any = {};
			orderBy[sortBy as string] = sortOrder;

			const albums = await prisma.album.findMany({
				where: whereClause,
				include: {
					artists: {
						include: {
							artist: true
						}
					},
					genre: true,
					label: true,
					tracks: true
				},
				orderBy,
				take: parseInt(limit as string),
				skip: parseInt(offset as string)
			});

			// Get total count for pagination
			const totalCount = await prisma.album.count({
				where: whereClause
			});

			res.status(200).send({
				message: "Advanced album search completed",
				albums,
				pagination: {
					total: totalCount,
					limit: parseInt(limit as string),
					offset: parseInt(offset as string),
					hasMore: (parseInt(offset as string) + parseInt(limit as string)) < totalCount
				}
			});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}
	//endregion

	//region Advanced Track Search
	async advancedTrackSearch(req: Request, res: Response) {
		const {
			title,
			artist,
			album,
			genre,
			durationFrom,
			durationTo,
			sortBy = 'title',
			sortOrder = 'asc',
			limit = 20,
			offset = 0
		} = req.query;

		try {
			let whereClause: any = {};

			// Title filter
			if (title) {
				whereClause.title = { contains: title as string };
			}

			// Artist filter
			if (artist) {
				whereClause.album = {
					artists: {
						some: {
							artist_name: { contains: artist as string }
						}
					}
				};
			}

			// Album filter
			if (album) {
				whereClause.album = {
					...whereClause.album,
					album_name: { contains: album as string }
				};
			}

			// Genre filter
			if (genre) {
				whereClause.album = {
					...whereClause.album,
					genre: {
						genre: { contains: genre as string }
					}
				};
			}

			// Duration range filter
			if (durationFrom || durationTo) {
				whereClause.duration = {};
				if (durationFrom) whereClause.duration.gte = parseInt(durationFrom as string);
				if (durationTo) whereClause.duration.lte = parseInt(durationTo as string);
			}

			// Sort options
			const orderBy: any = {};
			orderBy[sortBy as string] = sortOrder;

			const tracks = await prisma.track.findMany({
				where: whereClause,
				include: {
					album: {
						include: {
							artists: {
								include: {
									artist: true
								}
							},
							genre: true,
							label: true
						}
					}
				},
				orderBy,
				take: parseInt(limit as string),
				skip: parseInt(offset as string)
			});

			// Get total count for pagination
			const totalCount = await prisma.track.count({
				where: whereClause
			});

			res.status(200).send({
				message: "Advanced track search completed",
				tracks,
				pagination: {
					total: totalCount,
					limit: parseInt(limit as string),
					offset: parseInt(offset as string),
					hasMore: (parseInt(offset as string) + parseInt(limit as string)) < totalCount
				}
			});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'track', error);
		}
	}
	//endregion

	//region Get Search Suggestions
	async getSuggestions(req: Request, res: Response) {
		const query = req.query.q as string;
		const type = req.query.type as string; // 'albums', 'artists', 'tracks'

		if (!query || query.trim() === "") {
			return res.status(200).send({ suggestions: [] });
		}

		try {
			let suggestions: string[] = [];

			if (type === 'albums' || !type) {
				const albums = await prisma.album.findMany({
					where: {
						album_name: { contains: query }
					},
					select: { album_name: true },
					take: 5
				});
				suggestions = suggestions.concat(albums.map(a => a.album_name));
			}

			if (type === 'artists' || !type) {
				const artists = await prisma.artist.findMany({
					where: {
						artist_name: { contains: query }
					},
					select: { artist_name: true },
					take: 5
				});
				suggestions = suggestions.concat(artists.map(a => a.artist_name));
			}

			if (type === 'tracks' || !type) {
				const tracks = await prisma.track.findMany({
					where: {
						title: { contains: query }
					},
					select: { title: true },
					take: 5
				});
				suggestions = suggestions.concat(tracks.map(t => t.title));
			}

			// Remove duplicates and limit
			suggestions = [...new Set(suggestions)].slice(0, 10);

			res.status(200).send({ suggestions });
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'suggestions', error);
		}
	}
	//endregion
}
