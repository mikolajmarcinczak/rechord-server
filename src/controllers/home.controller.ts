import {Request, Response} from "express";

export default class HomeController {
	static welcome(req: Request, res: Response): Response {
		return res.json({message: "Welcome to reChord!"});
	}
}