"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const albums_controller_1 = __importDefault(require("../controllers/albums.controller"));
class AlbumsRoutes {
    router = (0, express_1.Router)();
    controller = new albums_controller_1.default();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.controller.getMany);
        this.router.get('/:artistName', this.controller.getManyByArtist);
        this.router.get('/:albumName', this.controller.getManyByName);
        this.router.get('/:catalogNumber', this.controller.getOne);
        this.router.post('/', this.controller.create);
        this.router.put('/:catalogNumber', this.controller.update);
        this.router.delete('/:catalogNumber', this.controller.deleteOne);
        this.router.delete('/', this.controller.deleteMany);
    }
}
exports.default = new AlbumsRoutes().router;
