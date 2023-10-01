import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class LabelsController {

	//region Get
	async getMany(req: Request, res: Response) {

	}

	async getOne(req: Request, res: Response) {

	}

	async getAlbumsByLabel(req: Request, res: Response) {
	}

	async getArtistByLabel(req: Request, res: Response) {
	}
	//endregion

	//region Post
	async create(req: Request, res: Response) {}
	//endregion

	//region Put
	async update(req: Request, res: Response) {}
	//endregion

	//region Delete
	async deleteOne(req: Request, res: Response) {}

	async deleteMany(req: Request, res: Response) {}
	//endregion
}