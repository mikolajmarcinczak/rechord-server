import { PrismaClient } from '@prisma/client';
import { Errors } from '../dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function deleteAlbum(req, res) {
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
        assertIsError(error);
        Errors.couldNotDelete(res, 'album', error);
    }
}
//# sourceMappingURL=delete.album.js.map