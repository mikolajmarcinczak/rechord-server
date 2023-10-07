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
  }

  async getAlbumsByArtist(req: Request, res: Response) {

  }
  //endregion

  //region Post
  async create(req: Request, res: Response) {

  }
  //endregion

  //region Put
  async update(req: Request, res: Response) {

  }
  //endregion

  //region Delete
  async deleteOne(req: Request, res: Response) {

  }

  async deleteMany(req: Request, res: Response) {

  }
  //endregion
}