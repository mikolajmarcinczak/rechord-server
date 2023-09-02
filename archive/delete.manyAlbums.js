import { PrismaClient } from '@prisma/client';
import { Errors } from '@/controllers/dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function deleteAlbums(req, res) {
    const catalogNumbers = req.query.catalogNumbers;
    if (!Array.isArray(catalogNumbers)) {
        return Errors.badRequest(res, 'album');
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
        assertIsError(error);
        Errors.couldNotDelete(res, 'album', error);
    }
}
//# sourceMappingURL=delete.manyAlbums.js.map