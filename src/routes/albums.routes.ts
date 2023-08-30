import {Router} from "express";
import {IRoutes} from "./iroutes";
import AlbumsController from "../controllers/albums.controller";

class AlbumsRoutes implements IRoutes {
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes()
	{
		this.router.get('/', AlbumsController.getMany);
		this.router.get('/:artistName', AlbumsController.getManyByArtist);
		this.router.get('/:albumName', AlbumsController.getManyByName);
		this.router.get('/:catalogNumber', AlbumsController.getOne);

		this.router.post('/', AlbumsController.create);

		this.router.put('/:catalogNumber', AlbumsController.update);

		this.router.delete('/:catalogNumber', AlbumsController.deleteOne);
		this.router.delete('/', AlbumsController.deleteMany);
	}
}
export default new AlbumsRoutes().router;