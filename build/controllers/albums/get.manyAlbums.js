"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbumsByArtist = exports.getManyAlbums = exports.getAlbumsByName = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function getAlbumsByName(req, res) {
    const albumName = req.query.albumName;
    if (albumName === "") {
        try {
            const albums = await prisma.album.findMany();
            res.send({ message: "Albums retrieved successfully", albums });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            return dberrors_1.Errors.couldNotRetrieve(res, 'album', error);
        }
    }
    else if (typeof albumName !== "string") {
        return dberrors_1.Errors.badRequest(res, 'album');
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
            (0, error_guard_1.assertIsError)(error);
            return dberrors_1.Errors.couldNotRetrieve(res, 'album', error);
        }
    }
}
exports.getAlbumsByName = getAlbumsByName;
async function getManyAlbums(req, res) {
    const catalogNumbers = req.query.catalogNumbers;
    if (!Array.isArray(catalogNumbers)) {
        return dberrors_1.Errors.badRequest(res, 'album');
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
        (0, error_guard_1.assertIsError)(error);
        return dberrors_1.Errors.couldNotRetrieve(res, 'album', error);
    }
}
exports.getManyAlbums = getManyAlbums;
async function getAlbumsByArtist(req, res) {
    const artistName = req.query.artistName;
    if (artistName === "" || typeof artistName !== "string") {
        return dberrors_1.Errors.badRequest(res, 'album');
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
        (0, error_guard_1.assertIsError)(error);
        return dberrors_1.Errors.couldNotRetrieve(res, 'album', error);
    }
}
exports.getAlbumsByArtist = getAlbumsByArtist;
