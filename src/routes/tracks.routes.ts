import {Router} from "express";
import {IRoutes} from "./iroutes";
import TracksController from "../controllers/tracks.controller";

class TracksRoutes implements IRoutes {
	router = Router();
	controller = new TracksController();

	constructor() {
		this.initRoutes();
	}

	initRoutes()
	{
		// Get routes
		this.router.get('/', this.controller.getMany);
		this.router.get('/search/title', this.controller.getManyByTitle);
		this.router.get('/search/artist', this.controller.getManyByArtist);
		this.router.get('/search/genre', this.controller.getManyByGenre);
		this.router.get('/:albumCatalogNumber/:albumName/:trackNumber', this.controller.getOne);

		// Post routes
		this.router.post('/', this.controller.create);

		// Put routes
		this.router.put('/:albumCatalogNumber/:albumName/:trackNumber', this.controller.update);

		// Delete routes
		this.router.delete('/:albumCatalogNumber/:albumName/:trackNumber', this.controller.deleteOne);
		this.router.delete('/', this.controller.deleteMany);
	}
}

export default new TracksRoutes().router;
