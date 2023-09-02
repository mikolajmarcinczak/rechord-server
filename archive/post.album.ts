import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Errors } from '../src/utility/dberrors';
import { assertIsError } from '../src/utility/error.guard';

const prisma = new PrismaClient();

export async function postAlbum(req: Request, res: Response){
    if (!req.body.catalogNumber){
        return Errors.badRequest(res, 'album');
    }

    const albumBody = req.body;

    try {
        const album = await prisma.album.create({
            data: albumBody
        });
        res.send({message: "Album created successfully", album});
    }
    catch (error: unknown) {
        assertIsError(error);
        return Errors.couldNotCreate(res, 'album', error);
    }
}