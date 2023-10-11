import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class ArtistsController {

  //region Get
  async getMany(req: Request, res: Response) {
    const artistNames = req.body.artist_names as string[];

    try {
      let whereClause = {};

      if (Array.isArray(artistNames) && artistNames.length > 0) {
        whereClause = {
          artist_name: {
            in: artistNames
          }
        };
      }

      const artists = await prisma.artist.findMany({
        where: whereClause
      });
      res.status(200).send({message: "Artists retrieved successfully", artists});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotRetrieve(res, 'artist', error);
    }
  }

  async getOne(req: Request, res: Response) {
    const artistName = req.params.artist_name;

    try {
      const artist = await prisma.artist.findUnique({
        where: {
          artist_name: artistName
        }
      });
      if (!artist) {
        return Errors.notFound(res, 'artist');
      }
      res.status(200).send({message: `Artist '${artistName}' retrieved successfully`, artist});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotRetrieve(res, 'artist', error);
    }
  }

  async getAlbumsByArtist(req: Request, res: Response) {
    const artistName = req.params.artist_name;

    try {
      const albums = await prisma.album.findMany({
        where: {
          artists: {
            some: {
              artist_name: artistName
            }
          }
        }
      });
      res.status(200).send({message: `Albums by artist '${artistName}' retrieved successfully`, albums});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotRetrieve(res, 'album', error);
    }
  }
  //endregion

  //region Post
  async create(req: Request, res: Response) {
    const artistBody = req.body;

    if (!artistBody.artist_name) {
      return Errors.badRequest(res, 'artist');
    }

    try {
      const artist = await prisma.artist.create({
        data: artistBody
      });
      res.status(201).send({message: `Artist '${artistBody.artist_name}' created successfully`, artist});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotCreate(res, 'artist', error);
    }
  }
  //endregion

  //region Put
  async update(req: Request, res: Response) {
    const artistName = req.params.artist_name;
    const artistBody = req.body;

    if (Object.keys(artistBody).length == 0) {
      return Errors.badRequest(res, 'artist');

    }

    try {
      const artist = await prisma.artist.update({
        where: {
          artist_name: artistName
        },
        data: artistBody
      });
      res.status(200).send({message: `Artist '${artistName}' updated successfully`, artist});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotUpdate(res, 'artist', error);
    }
  }
  //endregion

  //region Delete
  async deleteOne(req: Request, res: Response) {
    const artistName = req.params.artist_name;

    try {
      const artist = await prisma.artist.delete({
        where: {
          artist_name: artistName
        }
      });
      res.status(200).send({message: `Artist '${artistName}' deleted successfully`, artist});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotDelete(res, 'artist', error);
    }
  }

  async deleteMany(req: Request, res: Response) {
    const artistNames = req.body.artist_names as string[];

    try {
      const artists = await prisma.artist.deleteMany({
        where: {
          artist_name: {
            in: artistNames
          }
        }
      });
      res.status(200).send({message: `Artists deleted successfully`, artists});
    }
    catch (error: unknown) {
      assertIsError(error);
      return Errors.couldNotDelete(res, 'artist', error);
    }
  }
  //endregion
}