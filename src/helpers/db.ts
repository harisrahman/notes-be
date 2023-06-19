import { Response } from 'express';
import mongoose, { Model } from 'mongoose';
import Logger from '@helpers/logger';
import { failedRes } from '@helpers/response';
import HttpStatusCode from '@customTypes/HttpStatusCode';

export const isValidObjId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// Params : ObjectId, Express Router response, Name of item, Mongoose schema
export const findOrFail = async (
	objId: string,
	res: Response,
	itemName: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	model: Model<any, any, any>,
) => {
	if (isValidObjId(objId)) {
		try {
			const item = await model.findById(objId);
			if (item) return item;
		} catch (error) {
			if (error instanceof Error) {
				Logger.error(error.message);
				failedRes(res, error.message, HttpStatusCode.ServerError);
				return false;
			}
		}
	}

	const errMsg = `No ${itemName} with id: ${objId}`;
	failedRes(res, errMsg, HttpStatusCode.NotFound);
	return false;
};
