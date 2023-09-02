import { PrismaClient } from '@prisma/client';
import { Errors } from '@/controllers/dberrors';
import { assertIsError } from '@/utils/error.guard';
const prisma = new PrismaClient();
export async function postAlbum(req, res) {
    if (!req.body.catalogNumber) {
        return Errors.badRequest(res, 'album');
    }
    const albumBody = req.body;
    try {
        const album = await prisma.album.create({
            data: albumBody
        });
        res.send({ message: "Album created successfully", album });
    }
    catch (error) {
        assertIsError(error);
        return Errors.couldNotCreate(res, 'album', error);
    }
}
//# sourceMappingURL=post.album.js.map