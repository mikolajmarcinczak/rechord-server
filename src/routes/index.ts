import {Application} from "express";
import homeRoutes from "./home.routes";
import albumRoutes from "./albums.routes";

export default class Routes {
	constructor(app: Application) {
		app.use("/api", homeRoutes);
		app.use("/api/albums", albumRoutes);
	}
}