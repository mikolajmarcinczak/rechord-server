import {prisma} from "../utility/database";
import {Request, Response} from "express";
import {Errors} from "../utility/dberrors";
import {assertIsError} from "../utility/error.guard";

export default class LabelsController {

	//region Get
	async getMany(req: Request, res: Response) {
		try {
			const labels = await prisma.label.findMany();
			res.send({message: "Labels retrieved successfully", labels});
		} catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'label', error);
		}
	}

	async getOne(req: Request, res: Response) {
		const labelName = req.params.label_name;

		try {
			const label = await prisma.label.findUnique({
				where: {
					label_name: labelName
				}
			});
			res.send({message: `Label '${labelName}' retrieved successfully`, label});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'label', error);
		}
	}

	async getAlbumsByLabel(req: Request, res: Response) {
		const labelName = req.params.label_name;

		try {
			const albums = await prisma.album.findMany({
				where: {
					label: {
						label_name: labelName
					}
				}
			});
			res.send({message: `Albums by label '${labelName}' retrieved successfully`, albums});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'album', error);
		}
	}

	async getArtistByLabel(req: Request, res: Response) {
		const labelName = req.params.label_name;

		try {
			const albumsByLabel = await prisma.album.findMany({
				where: {
					label: {
						label_name: labelName
					}
				}
			});

			const artists = await prisma.artist.findMany({
				where: {
					albums: {
						some: {
							album: {
								catalog_number: {
									in: albumsByLabel.map(album => album.catalog_number)
								},
								album_name: {
									in: albumsByLabel.map(album => album.album_name)
								}
							}
						}
					}
				}
			});
			res.send({message: `Artists from label '${labelName}' retrieved successfully`, artists});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotRetrieve(res, 'artist', error);
		}
	}
	//endregion

	//region Post
	async create(req: Request, res: Response) {
		if (!req.body.label_name) {
			return Errors.badRequest(res, 'label');
		}

		const labelBody = req.body;

		try {
			const label = await prisma.label.create({
				data: labelBody
			});
			res.send({message: "Label created successfully", label});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotCreate(res, 'label', error);
		}
	}
	//endregion

	//region Put
	async update(req: Request, res: Response) {
		if (!req.body){
			return Errors.badRequest(res, 'label');
		}

		const labelName = req.body.label_name;

		try {
			const label = await prisma.label.update({
				where: {
					label_name: labelName
				},
				data: req.body
			});
			res.send({message: `Label updated successfully`, label});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotUpdate(res, 'label', error);
		}
	}
	//endregion

	//region Delete
	async deleteOne(req: Request, res: Response) {
		const labelName = req.params.label_name;

		try {
			const label = await prisma.label.delete({
				where: {
					label_name: labelName
				}
			});
			res.send({message: `Label '${labelName}' deleted successfully`, label});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotDelete(res, 'label', error);
		}
	}

	async deleteMany(req: Request, res: Response) {
		const labelNames = req.body.label_names as string[];

		if (!Array.isArray(labelNames)) {
			return Errors.badRequest(res, 'label');
		}

		try {
			const labels = await prisma.label.deleteMany({
				where: {
					label_name: {
						in: labelNames
					}
				}
			});
			res.send({message: `Labels deleted successfully`, labels});
		}
		catch (error: unknown) {
			assertIsError(error);
			return Errors.couldNotDelete(res, 'label', error);
		}
	}
	//endregion
}