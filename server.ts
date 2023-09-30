import "./src/utility/paths";
import type {Application} from "express";
import Server from "./src/index";
// @ts-ignore
import express from "express";
import {CorsOptions} from "cors";
import {config} from "./src/utility/config";

const static_path = __dirname + '/public';
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const startServer = (configuration : TServerConfig) => {
	const app: Application = express();
	const server = new Server(app, configuration);

	app.listen(configuration.port, "localhost", () => {
		console.log(`Server listening on port ${configuration.port}`);
	}).on("error", (err: any) => {
		if (err.code === "EADDRINUSE") {
			console.log("ERROR: address already in use, retry...");
		} else {
			console.log(err);
		}
	});
}

export type TServerConfig = {
	port: number;
	corsOptions: CorsOptions;
	limiter: {
		time: number;
		max: number;
	}
}

startServer(config.server);