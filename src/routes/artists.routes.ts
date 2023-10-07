import {Router} from "express";
import {IRoutes} from "./iroutes";
import ArtistsController from "../controllers/artists.controller";

class ArtistsRoutes implements IRoutes {
  router = Router();
  controller = new ArtistsController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', this.controller.getMany);
    this.router.get('/:artist_name', this.controller.getOne);
    this.router.get('/:artist_name/albums', this.controller.getAlbumsByArtist);

    this.router.post('/', this.controller.create);

    this.router.put('/:artist_name', this.controller.update);

    this.router.delete('/:artist_name', this.controller.deleteOne);
    this.router.delete('/', this.controller.deleteMany);
  }
}