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
			const genre = await prisma.genre.findUnique({
					OR:[
						{
							genre_id: parseInt(genreId)
						},
						{
							genre: genreName,
							style: genreStyle
						}
					]
			});
			res.status(200).send({message: `Genre '${genreId}' retrieved successfully`, genre});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'genre', error);
		}
	}

	async getAlbumsByGenre(req: Request, res: Response) {}

	async getArtistsByGenre(req: Request, res: Response) {}
	//endregion

	//region Post
	async create(req: Request, res: Response) {}
	//endregion

	//region Put
	async update(req: Request, res: Response) {}
	//endregion

	//region Delete
	async deleteMany(req: Request, res: Response) {}

	async deleteOne(req: Request, res: Response) {}
	//endregion

}