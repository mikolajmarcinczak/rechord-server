import { PrismaClient } from '@prisma/client';
import { Errors } from '../dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function getAlbum(req, res) {
    const id = req.params.catalogNumber;
    try {
        const album = await prisma.album.findUnique({
            where: {
                catalog_number: id
            }
        });
        if (!album) {
            return Errors.notFound(res, 'album');
        }
        res.send({ message: `Album '${album.album_name}'retrieved successfully`, album });
    }
    catch (error) {
        assertIsError(error);
        return Errors.couldNotRetrieve(res, 'album', error);
    }
}
//# sourceMappingURL=get.album.js.map