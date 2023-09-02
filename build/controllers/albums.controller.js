"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dberrors_1 = require("../utility/dberrors");
const error_guard_1 = require("../utility/error.guard");
const prisma = new client_1.PrismaClient();
class AlbumsController {
    //region Get
    async getMany(req, res) {
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
    async getManyByName(req, res) {
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
    async getManyByArtist(req, res) {
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
    async getOne(req, res) {
        const id = req.params.catalogNumber;
        try {
            const album = await prisma.album.findUnique({
                where: {
                    catalog_number: id
                }
            });
            if (!album) {
                return dberrors_1.Errors.notFound(res, 'album');
            }
            res.send({ message: `Album '${album.album_name}'retrieved successfully`, album });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            return dberrors_1.Errors.couldNotRetrieve(res, 'album', error);
        }
    }
    //endregion
    //region Post
    async create(req, res) {
        if (!req.body.catalogNumber) {
            return dberrors_1.Errors.badRequest(res, 'album');
        }
        const albumBody = req.body;
        try {
            const album = await prisma.album.create({
                data: albumBody
            });
            res.send({ message: "Album created successfully", album });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            return dberrors_1.Errors.couldNotCreate(res, 'album', error);
        }
    }
    //endregion
    //region Put
    async update(req, res) {
        if (!req.body) {
            return dberrors_1.Errors.badRequest(res, 'album');
        }
        const catNumber = req.params.catalogNumber;
        try {
            const album = await prisma.album.update({
                where: {
                    catalog_number: catNumber
                },
                data: req.body
            });
            res.send({ message: "Album updated successfully", album });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            return dberrors_1.Errors.couldNotUpdate(res, 'album', error);
        }
    }
    //endregion
    //region Delete
    async deleteOne(req, res) {
        const catNumber = req.params.catalogNumber;
        try {
            const album = await prisma.album.delete({
                where: {
                    catalog_number: catNumber
                }
            });
            res.send({ message: `Album '${catNumber}' deleted successfully`, album });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            dberrors_1.Errors.couldNotDelete(res, 'album', error);
        }
    }
    async deleteMany(req, res) {
        const catalogNumbers = req.query.catalogNumbers;
        if (!Array.isArray(catalogNumbers)) {
            return dberrors_1.Errors.badRequest(res, 'album');
        }
        try {
            const albums = await prisma.album.deleteMany({
                where: {
                    catalog_number: {
                        in: catalogNumbers
                    }
                }
            });
            res.send({ message: `Albums deleted successfully`, albums });
        }
        catch (error) {
            (0, error_guard_1.assertIsError)(error);
            dberrors_1.Errors.couldNotDelete(res, 'album', error);
        }
    }
}
exports.default = AlbumsController;
