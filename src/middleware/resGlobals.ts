import { Request, Response, NextFunction } from 'express';
import { ResDataType } from '@customTypes/index';

export default async function addGlobals(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { path } = req;
	const splitPath = path.split('/');
	let dataType: ResDataType = 'html';

	if (splitPath[1] === 'api') {
		dataType = 'json';
	}

	res.dataType = dataType;
	next();
}
