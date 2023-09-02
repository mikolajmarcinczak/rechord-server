import { PrismaClient } from '@prisma/client';
import { Errors } from '@/controllers/dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function updateAlbum(req, res) {
    if (!req.body) {
        return Errors.badRequest(res, 'album');
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
        assertIsError(error);
        return Errors.couldNotUpdate(res, 'album', error);
    }
}
//# sourceMappingURL=put.updateAlbum.js.map