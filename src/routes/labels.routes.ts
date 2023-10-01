import {Router} from "express";
import {IRoutes} from "./iroutes";
import LabelsController from "../controllers/labels.controller";

class LabelsRoutes implements IRoutes {
	router = Router();
	controller = new LabelsController();

	constructor() {
		this.initRoutes();
	}

	initRoutes()
	{
		this.router.get('/', this.controller.getMany);
		this.router.get('/:label_id', this.controller.getOne);
		this.router.get('/:label_id/albums', this.controller.getAlbumsByLabel);
		this.router.get('/:label_id/artists', this.controller.getArtistByLabel);

		this.router.post('/', this.controller.create);

		this.router.put('/:label_id', this.controller.update);

		this.router.delete('/', this.controller.deleteMany);
		this.router.delete('/:label_id', this.controller.deleteOne);
	}
}

export default new LabelsRoutes().router;