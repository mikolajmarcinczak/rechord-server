"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbum = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function getAlbum(req, res) {
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
exports.getAlbum = getAlbum;
