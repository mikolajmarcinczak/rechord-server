import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class TracksController {

	//region Get
	async getMany(req: Request, res: Response) {
		const trackNumbers = req.query.trackNumbers as string[];
		const albumCatalogNumber = req.query.albumCatalogNumber as string;
		const albumName = req.query.albumName as string;

		try {
			let whereClause: any = {};

			// Filtrowanie po numerach utworów
			if (Array.isArray(trackNumbers) && trackNumbers.length > 0) {
				whereClause.number = {
					in: trackNumbers
				};
			}

			// Filtrowanie po albumie
			if (albumCatalogNumber && albumName) {
				whereClause.album = {
					catalog_number: albumCatalogNumber,
					album_name: albumName
				};
			}

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
				}
			});
			res.status(200).send({message: "Tracks retrieved successfully", tracks});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'track', error);
		}
	}

	async getManyByTitle(req: Request, res: Response) {
		const title = req.query.title as string;

		if (title === "") {
			try {
				const tracks = await prisma.track.findMany({
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
					}
				});
				res.status(200).send({message: "Tracks retrieved successfully", tracks});
			} catch (error: unknown) {
				assertIsError(error);
				return Errors.couldNotRetrieve(res, 'track', error);
			}
		}
		else if (typeof title !== "string") {
			return Errors.badRequest(res, 'track');
		}
		else {
			try {
				const tracks = await prisma.track.findMany({
					where: {
						title: {
							contains: title
						}
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
					}
				});
				res.status(200).send({message: `Tracks with title '${title}' retrieved successfully`, tracks});
			} catch (error: unknown) {
				assertIsError(error);
				return Errors.couldNotRetrieve(res, 'track', error);
			}
		}
	}

	async getManyByArtist(req: Request, res: Response) {
		const artistName = req.query.artist_name as string;

		if (artistName === "") {
			return Errors.badRequest(res, 'track');
		}

		try {
			const tracks = await prisma.track.findMany({
				where: {
					album: {
						artists: {
							some: {
								artist_name: {
									contains: artistName
								}
							}
						}
					}
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
				}
			});
			res.status(200).send({message: `Tracks by artist '${artistName}' retrieved successfully`, tracks});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'track', error);
		}
	}

	async getManyByGenre(req: Request, res: Response) {
		const genreId = req.query.genre_id as string;

		if (!genreId) {
			return Errors.badRequest(res, 'track');
		}

		try {
			const tracks = await prisma.track.findMany({
				where: {
					album: {
						genre: {
							genre_id: parseInt(genreId)
						}
					}
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
				}
			});
			res.status(200).send({message: `Tracks in genre retrieved successfully`, tracks});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'track', error);
		}
	}

	async getOne(req: Request, res: Response) {
		const trackNumber = req.params.trackNumber;
		const albumCatalogNumber = req.params.albumCatalogNumber;
		const albumName = req.params.albumName;

		try {
			const track = await prisma.track.findUnique({
				where: {
					number_albumCatalog_number_albumAlbum_name: {
						number: trackNumber,
						albumCatalog_number: albumCatalogNumber,
						albumAlbum_name: albumName
					}
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
				}
			});
			if (!track) {
				return Errors.notFound(res, 'track');
			}
			res.status(200).send({message: `Track '${track.title}' retrieved successfully`, track});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'track', error);
		}
	}
	//endregion

	//region Post
	async create(req: Request, res: Response){
		if (!req.body.number || !req.body.albumCatalog_number || !req.body.albumAlbum_name){
			return Errors.badRequest(res, 'track');
		}

		const trackBody = req.body;

		try {
			const track = await prisma.track.create({
				data: trackBody,
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
				}
			});
			res.status(201).send({message: "Track created successfully", track});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotCreate(res, 'track', error);
		}
	}
	//endregion

	//region Put
	async update(req: Request, res: Response){
		const trackBody = req.body;
		if (Object.keys(trackBody).length === 0) {
			return Errors.badRequest(res, 'track');
		}

		const trackNumber = req.params.trackNumber;
		const albumCatalogNumber = req.params.albumCatalogNumber;
		const albumName = req.params.albumName;

		try {
			const track = await prisma.track.update({
				where: {
					number_albumCatalog_number_albumAlbum_name: {
						number: trackNumber,
						albumCatalog_number: albumCatalogNumber,
						albumAlbum_name: albumName
					}
				},
				data: trackBody,
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
				}
			});
			res.status(200).send({message: "Track updated successfully", track});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotUpdate(res, 'track', error);
		}
	}
	//endregion

	//region Delete
	async deleteOne(req: Request, res: Response){
		const trackNumber = req.params.trackNumber;
		const albumCatalogNumber = req.params.albumCatalogNumber;
		const albumName = req.params.albumName;

		try {
			const track = await prisma.track.delete({
				where: {
					number_albumCatalog_number_albumAlbum_name: {
						number: trackNumber,
						albumCatalog_number: albumCatalogNumber,
						albumAlbum_name: albumName
					}
				}
			});
			res.status(200).send({message: `Track '${trackNumber}' deleted successfully`, track});
		}
		catch (error: unknown) {
			assertIsError(error);
			Errors.couldNotDelete(res, 'track', error);
		}
	}

	async deleteMany(req: Request, res: Response){
		const trackIds = req.body.track_ids as Array<{
			number: string;
			albumCatalog_number: string;
			albumAlbum_name: string;
		}>;

		if (!Array.isArray(trackIds)) {
			return Errors.badRequest(res, 'track');
		}

		try {
			const tracks = await prisma.track.deleteMany({
				where: {
					OR: trackIds.map(id => ({
						number: id.number,
						albumCatalog_number: id.albumCatalog_number,
						albumAlbum_name: id.albumAlbum_name
					}))
				}
			});
			res.status(200).send({message: `Tracks deleted successfully`, tracks});
		}	catch (error: unknown) {
			assertIsError(error);
			Errors.couldNotDelete(res, 'track', error);
		}
	}
	//endregion
}
