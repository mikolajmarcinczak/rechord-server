import {getAlbumsByArtist, getAlbumsByName, getManyAlbums} from "./albums/get.manyAlbums";
import {getAlbum} from "./albums/get.album";
import {postAlbum} from "./albums/post.album";
import {updateAlbum} from "./albums/put.updateAlbum";
import {deleteAlbum} from "./albums/delete.album";
import {deleteAlbums} from "./albums/delete.manyAlbums";

export default class AlbumsController {
	//region Get
	static getMany = getAlbumsByName;
	static getManyByName = getManyAlbums;
	static getManyByArtist = getAlbumsByArtist;
	static getOne = getAlbum;
	//endregion

	//region Post
	static create = postAlbum;
	//endregion

	//region Put
	static update = updateAlbum;
	//endregion

	//region Delete
	static deleteOne = deleteAlbum;
	static deleteMany = deleteAlbums;
	//endregion
}