import {prisma} from "../../utility/database";
import { Request, Response } from 'express';
import { Errors } from '../src/utility/dberrors';
import { assertIsError } from '../src/utility/error.guard';

export async function deleteAlbums(req: Request, res: Response){
	const catalogNumbers = req.query.catalogNumbers as string[];

	if (!Array.isArray(catalogNumbers)) {
		return Errors.badRequest(res, 'album');
	}

	try {
		const albums = await prisma.album.deleteMany({
			where: {
				catalog_number: {
					in: catalogNumbers
				}
			}
		});
		res.send({message: `Albums deleted successfully`, albums});
	}	catch (error: unknown) {
		assertIsError(error);
		Errors.couldNotDelete(res, 'album', error);
	}
}