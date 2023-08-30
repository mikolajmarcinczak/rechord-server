import "utility/paths";
import type {Application} from "express";
import Server from "./src/index";
import express from "express";

const static_path = __dirname + '/public';
const app: Application = express();
const server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.listen(PORT, "localhost", () => {
	console.log(`Server listening on port ${PORT}`);
}).on("error", (err: any) => {
	if (err.code === "EADDRINUSE") {
		console.log("ERROR: address already in use, retry...");
	} else {
		console.log(err);
	}
});