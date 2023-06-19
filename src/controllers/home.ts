import { successRes } from '@helpers/response';
import { Request, Response } from 'express';

export const getHome = (req: Request, res: Response) => {
	successRes(res, {}, 'Welcome Home');
};
