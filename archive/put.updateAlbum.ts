import {prisma} from "../../utility/database";
import { Request, Response } from 'express';
import { Errors } from '../src/utility/dberrors';
import { assertIsError } from '../src/utility/error.guard';

export async function updateAlbum(req: Request, res: Response){
	if (!req.body) {
		return Errors.badRequest(res, 'album');
	}

	const catNumber = req.params.catalogNumber;

	try {
		const album = await prisma.album.update({
			where: {
				catalog_number: catNumber
			},
			data: req.body
		});
		res.send({message: "Album updated successfully", album});
	}
	catch (error: unknown) {
		assertIsError(error);
		return Errors.couldNotUpdate(res, 'album', error);
	}
}