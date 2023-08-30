"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = __importDefault(require("../controllers/home.controller"));
class HomeRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', home_controller_1.default.welcome);
    }
}
exports.default = new HomeRoutes().router;
