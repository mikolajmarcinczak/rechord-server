"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_manyAlbums_1 = require("./albums/get.manyAlbums");
const get_album_1 = require("./albums/get.album");
const post_album_1 = require("./albums/post.album");
const put_updateAlbum_1 = require("./albums/put.updateAlbum");
const delete_album_1 = require("./albums/delete.album");
const delete_manyAlbums_1 = require("./albums/delete.manyAlbums");
class AlbumsController {
    //region Get
    static getMany = get_manyAlbums_1.getAlbumsByName;
    static getManyByName = get_manyAlbums_1.getManyAlbums;
    static getManyByArtist = get_manyAlbums_1.getAlbumsByArtist;
    static getOne = get_album_1.getAlbum;
    //endregion
    //region Post
    static create = post_album_1.postAlbum;
    //endregion
    //region Put
    static update = put_updateAlbum_1.updateAlbum;
    //endregion
    //region Delete
    static deleteOne = delete_album_1.deleteAlbum;
    static deleteMany = delete_manyAlbums_1.deleteAlbums;
}
exports.default = AlbumsController;
