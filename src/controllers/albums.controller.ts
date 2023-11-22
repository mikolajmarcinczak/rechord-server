import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class AlbumsController {

	//region Get
	async getMany(req: Request, res: Response) {
		const catalogNumbers = req.query.catalogNumbers as string[];
		try {
			let whereClause = {};

			if (Array.isArray(catalogNumbers) && catalogNumbers.length > 0) {
				whereClause = {
					catalog_number: {
						in: catalogNumbers
					}
				};
			}
			const albums = await prisma.album.findMany({
				where: whereClause
			});
			res.status(200).send({message: "Albums retrieved successfully", albums});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}

	async getManyByName(req: Request, res: Response) {
		const albumName = req.query.album_name as string;

		if (albumName === "") {
			try {
				const albums = await prisma.album.findMany();
				res.status(200).send({message: "Albums retrieved successfully", albums});
			} catch (error: unknown) {
				assertIsError(error);
				return Errors.couldNotRetrieve(res, 'album', error);
			}
		}
		else if (typeof albumName !== "string") {
			return Errors.badRequest(res, 'album');
		}
		else  {
			try {
				const albums = await prisma.album.findMany({
					where: {
						album_name: {
							contains: albumName
						}
					}
				});
				res.status(200).send({message: `Albums with name '${albumName}' retrieved successfully`, albums});
			} catch (error: unknown) {
				assertIsError(error);
				return Errors.couldNotRetrieve(res, 'album', error);
			}
		}
	}

	async getManyByArtist(req: Request, res: Response) {
		const artistName = req.query.artist_name as string;

		if (artistName === "") {
			return Errors.badRequest(res, 'album');
		}

		try {
			const albums = await prisma.album.findMany({
				where: {
					artists: {
						some: {
							artist_name: {
								contains: artistName
							}
						}
					}
				}
			});
			res.status(200).send({message: `Albums by '${artistName}' retrieved successfully`, albums});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}

	async getOne(req: Request, res: Response) {
		const id = req.params.catalogNumber;

		try {
			const album = await prisma.album.findUnique({
				where: {
					catalog_number: id
				}
			});
			if (!album) {
				return Errors.notFound(res, 'album');
			}
			res.status(200).send({message: `Album '${album.album_name}'retrieved successfully`, album});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}
	//endregion

	//region Post
	async create(req: Request, res: Response){
		if (!req.body.catalog_number){
			return Errors.badRequest(res, 'album');
		}

		const albumBody = req.body;

		try {
			const album = await prisma.album.create({
				data: albumBody
			});
			res.status(200).send({message: "Album created successfully", album});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotCreate(res, 'album', error);
		}
	}
	//endregion

	//region Put
	async update(req: Request, res: Response){
		const albumBody = req.body;
		if (Object.keys(albumBody).length === 0) {
			return Errors.badRequest(res, 'album');
		}

		const catNumber = req.body.catalog_number;

		try {
			const album = await prisma.album.update({
				where: {
					catalog_number: catNumber
				},
				data: req.body
			});
			res.status(200).send({message: "Album updated successfully", album});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotUpdate(res, 'album', error);
		}
	}
	//endregion

	//region Delete
	async deleteOne(req: Request, res: Response){
		const catNumber = req.params.catalogNumber;

		try {
			const album = await prisma.album.delete({
				where: {
					catalog_number: catNumber
				}
			});
			res.status(200).send({message: `Album '${catNumber}' deleted successfully`, album});
		}
		catch (error: unknown) {
			assertIsError(error);
			Errors.couldNotDelete(res, 'album', error);
		}
	}

	async deleteMany(req: Request, res: Response){
		const catalogNumbers = req.body.catalog_numbers as string[];

		if (!Array.isArray(catalogNumbers)) {
			return Errors.badRequest(res, 'album');
		}

		try {
			const albums = await prisma.album.deleteMany({
				where: {
					catalog_number: {
						in: catalogNumbers
					}
				}
			});
			res.status(200).send({message: `Albums deleted successfully`, albums});
		}	catch (error: unknown) {
			assertIsError(error);
			Errors.couldNotDelete(res, 'album', error);
		}
	}
	//endregion
}