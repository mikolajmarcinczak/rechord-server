import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class GenresController {

	//region Get
	async getMany(req: Request, res: Response) {}

	async getOne(req: Request, res: Response) {}

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