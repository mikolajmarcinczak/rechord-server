import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Errors } from 'utility/dberrors';
import { assertIsError } from 'utility/error.guard';

const prisma = new PrismaClient();

export async function getAlbum(req: Request, res: Response) {
    const id = req.params.catalogNumber;

    try {
        const album = await prisma.album.findUnique({
            where: {
                catalog_number: id
            }
        });
        if (!album) {
            return Errors.notFound(res, 'album');
        }
        res.send({message: `Album '${album.album_name}'retrieved successfully`, album});
    }
    catch (error: unknown) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}