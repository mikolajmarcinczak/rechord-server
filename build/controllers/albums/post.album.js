"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAlbum = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function postAlbum(req, res) {
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
exports.postAlbum = postAlbum;
