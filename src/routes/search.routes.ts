import {Router} from "express";
import {IRoutes} from "./iroutes";
import SearchController from "../controllers/search.controller";

class SearchRoutes implements IRoutes {
	router = Router();
	controller = new SearchController();

	constructor() {
		this.initRoutes();
	}

	initRoutes()
	{
		// Global search
		this.router.get('/', this.controller.globalSearch);
		
		// Advanced searches
		this.router.get('/albums', this.controller.advancedAlbumSearch);
		this.router.get('/tracks', this.controller.advancedTrackSearch);
		
		// Suggestions
		this.router.get('/suggestions', this.controller.getSuggestions);
	}
}

export default new SearchRoutes().router;
