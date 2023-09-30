import {prisma} from "../../utility/database";
import { Request, Response } from 'express';
import { Errors } from 'utility/dberrors';
import { assertIsError } from 'utility/error.guard';

const prisma = new PrismaClient();

export async function getAlbumsByName(req: Request, res: Response) {
    const albumName = req.query.albumName;

    if (albumName === "") {
        try {
            const albums = await prisma.album.findMany();
            res.send({message: "Albums retrieved successfully", albums});
        } catch (error: unknown) {
            assertIsError(error);
            return Errors.couldNotRetrieve(res, 'album', error);
        }
    }
    else if (typeof albumName !== "string") {
        return Errors.badRequest(res, 'album');
    }
    else  {
        try {
            const albums = await prisma.album.findMany({
                where: {
                    album_name: {
                        contains: albumName
                    }
                }
            });
            res.send({message: `Albums with name '${albumName}' retrieved successfully`, albums});
        } catch (error: unknown) {
            assertIsError(error);
            return Errors.couldNotRetrieve(res, 'album', error);
        }
    }
}

export async function getManyAlbums(req: Request, res: Response) {
    const catalogNumbers = req.query.catalogNumbers as string[];

    if (!Array.isArray(catalogNumbers)) {
        return Errors.badRequest(res, 'album');
    }

    try {
        const albums = await prisma.album.findMany({
            where: {
                catalog_number: {
                    in: catalogNumbers
                }
            }
        });
        res.send({message: "Albums retrieved successfully", albums});
    } catch (error: unknown) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}

export async function getAlbumsByArtist(req: Request, res: Response) {
    const artistName = req.query.artistName;

    if (artistName === "" || typeof artistName !== "string") {
        return Errors.badRequest(res, 'album');
    }

    try {
        const albums = await prisma.album.findMany({
            where: {
                artists: {
                    some: {
                        artist_name: {
                            contains: artistName
                        }
                    }
                }
            }
        });
        res.send({message: `Albums by '${artistName}' retrieved successfully`, albums});
    } catch (error: unknown) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}