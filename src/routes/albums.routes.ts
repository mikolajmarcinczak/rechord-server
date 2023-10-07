import {Router} from "express";
import {IRoutes} from "./iroutes";
import AlbumsController from "../controllers/albums.controller";

class AlbumsRoutes implements IRoutes {
	router = Router();
	controller = new AlbumsController();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
		this.router.get('/', this.controller.getMany);
		this.router.get('/?albumName', this.controller.getManyByName);
		this.router.get('/:catalogNumber', this.controller.getOne);

		this.router.post('/', this.controller.create);

		this.router.put('/:catalogNumber', this.controller.update);

		this.router.delete('/:catalogNumber', this.controller.deleteOne);
		this.router.delete('/', this.controller.deleteMany);
	}
}

export default new AlbumsRoutes().router;