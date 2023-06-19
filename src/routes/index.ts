import { Request, Response, NextFunction, Application } from 'express';
import HttpException from '@helpers/request';
import homeRoutes from '@routes/guests/home';
import Logger from '@helpers/logger';
import { failedRes } from '@helpers/response';
import HttpStatusCode from '@customTypes/HttpStatusCode';
import { tryFrom } from '@helpers/enum';

export default (app: Application) => {
	// Guest Routes
	app.use('/', homeRoutes);

	// Error Routes
	app.use((req: Request, res: Response) =>
		failedRes(res, 'Not found', HttpStatusCode.NotFound),
	);

	app.use(
		(
			error: HttpException,
			req: Request,
			res: Response,
			next: NextFunction,
		) => {
			const status = tryFrom(
				HttpStatusCode,
				error.statusCode || error.status || 500,
				HttpStatusCode.ServerError,
			);

			Logger.error(error.message);
			return failedRes(res, error.message, status);
		},
	);
};
