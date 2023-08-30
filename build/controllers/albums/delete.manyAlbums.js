"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlbums = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function deleteAlbums(req, res) {
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
exports.deleteAlbums = deleteAlbums;
