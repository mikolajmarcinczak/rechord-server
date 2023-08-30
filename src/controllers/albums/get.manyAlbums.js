import { PrismaClient } from '@prisma/client';
import { Errors } from '@/controllers/dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function getAlbumsByName(req, res) {
    const albumName = req.query.albumName;
    if (albumName === "") {
        try {
            const albums = await prisma.album.findMany();
            res.send({ message: "Albums retrieved successfully", albums });
        }
        catch (error) {
            assertIsError(error);
            return Errors.couldNotRetrieve(res, 'album', error);
        }
    }
    else if (typeof albumName !== "string") {
        return Errors.badRequest(res, 'album');
    }
    else {
        try {
            const albums = await prisma.album.findMany({
                where: {
                    album_name: {
                        contains: albumName
                    }
                }
            });
            res.send({ message: `Albums with name '${albumName}' retrieved successfully`, albums });
        }
        catch (error) {
            assertIsError(error);
            return Errors.couldNotRetrieve(res, 'album', error);
        }
    }
}
export async function getManyAlbums(req, res) {
    const catalogNumbers = req.query.catalogNumbers;
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
        res.send({ message: "Albums retrieved successfully", albums });
    }
    catch (error) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}
export async function getAlbumsByArtist(req, res) {
    const artistName = req.body.artistName;
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
        res.send({ message: `Albums by '${artistName}' retrieved successfully`, albums });
    }
    catch (error) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}
//# sourceMappingURL=get.manyAlbums.js.map