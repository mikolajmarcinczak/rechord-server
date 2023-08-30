"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlbum = void 0;
const client_1 = require("@prisma/client");
const dberrors_1 = require("../../utility/dberrors");
const error_guard_1 = require("../../utility/error.guard");
const prisma = new client_1.PrismaClient();
async function deleteAlbum(req, res) {
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
exports.deleteAlbum = deleteAlbum;
