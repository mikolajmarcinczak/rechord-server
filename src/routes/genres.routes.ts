import {Router} from "express";
import {IRoutes} from "./iroutes";
import GenresController from "../controllers/genres.controller";

class GenresRoutes implements IRoutes {
	router = Router();
	controller = new GenresController();

	constructor() {
		this.initRoutes();
	}

	initRoutes()
	{
		this.router.get('/', this.controller.getMany);
		this.router.get('/:genre_id', this.controller.getOne);
		this.router.get('/:genre_id/albums', this.controller.getAlbumsByGenre);
		this.router.get('/:genre_id/artists', this.controller.getArtistsByGenre);

		this.router.post('/', this.controller.create);

		this.router.put('/:genre_id', this.controller.update);

		this.router.delete('/:genre_id', this.controller.deleteOne);
		this.router.delete('/', this.controller.deleteMany);
	}
}

export default new GenresRoutes().router;