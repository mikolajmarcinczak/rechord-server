"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const albums_controller_1 = __importDefault(require("../controllers/albums.controller"));
class AlbumsRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', albums_controller_1.default.getMany);
        this.router.get('/:artistName', albums_controller_1.default.getManyByArtist);
        this.router.get('/:albumName', albums_controller_1.default.getManyByName);
        this.router.get('/:catalogNumber', albums_controller_1.default.getOne);
        this.router.post('/', albums_controller_1.default.create);
        this.router.put('/:catalogNumber', albums_controller_1.default.update);
        this.router.delete('/:catalogNumber', albums_controller_1.default.deleteOne);
        this.router.delete('/', albums_controller_1.default.deleteMany);
    }
}
exports.default = new AlbumsRoutes().router;
