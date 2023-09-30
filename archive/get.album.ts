import {prisma} from "../../utility/database";
import { Request, Response } from 'express';
import { Errors } from '../src/utility/dberrors';
import { assertIsError } from '../src/utility/error.guard';

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