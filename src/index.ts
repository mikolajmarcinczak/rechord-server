import {Application} from "express";
import cors, {CorsOptions} from "cors";
import bodyParser from "body-parser";
import Routes from "./routes";

export default class Server {
	constructor(app: Application) {
		this.config(app);
		new Routes(app);
	}

	private config(app: Application): void {
		const corsOptions: CorsOptions = {
			origin: 'http://localhost:8081'
		};

		app.use(cors(corsOptions));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
	}
}