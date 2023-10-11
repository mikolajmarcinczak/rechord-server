import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class GenresController {

	//region Get
	async getMany(req: Request, res: Response) {
		const genreIds = req.body.genre_ids as number[];

		try {
			let whereClause = {};

			if (Array.isArray(genreIds) && genreIds.length > 0) {
				whereClause = {
					genre_id: {
						in: genreIds
					}
				};
			}

			const genres = await prisma.genre.findMany({
				where: whereClause
			});
			res.status(200).send({message: "Genres retrieved successfully", genres});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'genre', error);
		}
	}

	async getOne(req: Request, res: Response) {
		const genreId = req.params.genre_id;
		const genreName = req.params.genre_name, genreStyle = req.params.genre_style;

		try {
			let genre;

			if (genreId) {
				genre = await prisma.genre.findUniqueOrThrow({
					where: {
						genre_id: parseInt(genreId)
					}
				});
			}
			else {
				genre = await prisma.genre.findFirstOrThrow({
					where: {
						genre: genreName,
						style: genreStyle
					}
				});
			}
			if (genre) {
				res.status(200).send({message: `Genre '${genre.genre} ${genre.style}' retrieved successfully`, genre});
			}
			else {
				return Errors.notFound(res, 'genre');
			}
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'genre', error);
		}
	}

	async getAlbumsByGenre(req: Request, res: Response) {
		const genreId = req.params.genre_id;
		const genre = await prisma.genre.findUniqueOrThrow({
			where: {
				genre_id: parseInt(genreId)
			}
		});
		try {
			const albums = await prisma.album.findMany({
				where: {
					genre: {
						genre_id: parseInt(genreId)
					}
				}
			});
			res.status(200).send({message: `Albums in genre '${genre.genre} ${genre.style}' retrieved successfully`, albums});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}

	async getArtistsByGenre(req: Request, res: Response) {
		const genreId = req.params.genre_id;
		const genre = await prisma.genre.findUniqueOrThrow({
			where: {
				genre_id: parseInt(genreId)
			}
		});

		try {
			const albumsByGenre = await prisma.album.findMany({
				where: {
					genre: {
						genre_id: parseInt(genreId)
					}
				}
			});

			const artists = await prisma.artist.findMany({
				where: {
					albums: {
						some: {
							album: {
								catalog_number: {
									in: albumsByGenre.map(album => album.catalog_number)
								},
								album_name: {
									in: albumsByGenre.map(album => album.album_name)
								}
							}
						}
					}
				}
			});
			res.status(200).send({message: `Artists in genre '${genre.genre} ${genre.style}' retrieved successfully`, artists});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'artist', error);
		}
	}
	//endregion

	//region Post
	async create(req: Request, res: Response) {
		if (!req.body.genre || !req.body.style) {
			return Errors.badRequest(res, 'genre');
		}

		const genreBody = req.body;

		try {
			const newGenre = await prisma.genre.create({
				data: genreBody
			});
			res.status(200).send({message: `Genre '${newGenre.genre} ${newGenre.style}' created successfully`, newGenre});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotCreate(res, 'genre', error);
		}
	}
	//endregion

	//region Put
	async update(req: Request, res: Response) {
		const genreBody = req.body;

		if (Object.keys(genreBody).length == 0) {
			return Errors.badRequest(res, 'genre');
		}

		try {
			const genre = await prisma.genre.update({
				where: {
					genre_id: genreBody.genre_id
				},
				data: genreBody
			});
			res.status(200).send({message: `Genre '${genre.genre} ${genre.style}' updated successfully`, genre});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotUpdate(res, 'genre', error);
		}
	}
	//endregion

	//region Delete
	async deleteOne(req: Request, res: Response) {
		const genreId = req.params.genre_id;

		try {
			const genre = await prisma.genre.delete({
				where: {
					genre_id: parseInt(genreId)
				}
			});
			res.status(200).send({message: `Genre '${genre.genre} ${genre.style}' deleted successfully`, genre});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotDelete(res, 'genre', error);
		}
	}

	async deleteMany(req: Request, res: Response) {
		const genreIds = req.body.genre_ids as number[];

		if (!Array.isArray(genreIds)) {
			return Errors.badRequest(res, 'genre');
		}

		try {
			const genres = await prisma.genre.deleteMany({
				where: {
					genre_id: {
						in: genreIds
					}
				}
			});
			res.status(200).send({message: `Genres deleted successfully`, genres});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotDelete(res, 'genre', error);
		}
	}
	//endregion
}