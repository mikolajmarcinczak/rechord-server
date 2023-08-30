import express from "express";

export interface IRoutes {
	router: express.Router;
	initRoutes(): void;
}