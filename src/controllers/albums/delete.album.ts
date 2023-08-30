import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { Errors } from 'utility/dberrors';
import { assertIsError } from 'utility/error.guard';

const prisma = new PrismaClient();

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