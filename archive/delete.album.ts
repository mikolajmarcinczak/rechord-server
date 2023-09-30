import {prisma} from "../../utility/database";
import type { Request, Response } from 'express';
import { Errors } from '../src/utility/dberrors';
import { assertIsError } from '../src/utility/error.guard';

export async function deleteAlbum(req: Request, res: Response){
		const catNumber = req.params.catalogNumber;

		try {
				const album = await prisma.album.delete({
						where: {
								catalog_number: catNumber
						}
				});
				res.send({message: `Album '${catNumber}' deleted successfully`, album});
		}
		catch (error: unknown) {
				assertIsError(error);
				Errors.couldNotDelete(res, 'album', error);
		}
}