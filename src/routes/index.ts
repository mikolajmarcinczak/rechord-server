import {Application} from "express";
import homeRoutes from "./home.routes";
import albumsRoutes from "./albums.routes";
import genresRoutes from "./genres.routes";
import labelsRoutes from "./labels.routes";

export default class Routes {
	constructor(app: Application) {
		app.use("/api", homeRoutes);
		app.use("/api/albums", albumsRoutes);
		app.use("/api/genres", genresRoutes);
		app.use("/api/labels", labelsRoutes);
	}
}