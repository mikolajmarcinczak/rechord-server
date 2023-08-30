import {Router} from "express";
import {IRoutes} from "./iroutes";
import HomeController from "../controllers/home.controller";

class HomeRoutes implements  IRoutes {
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
		this.router.get('/', HomeController.welcome);
	}
}

export default new HomeRoutes().router;