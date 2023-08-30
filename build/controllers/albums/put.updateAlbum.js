"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlbum = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function updateAlbum(req, res) {
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
exports.updateAlbum = updateAlbum;
