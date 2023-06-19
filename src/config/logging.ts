import { Application } from 'express';
import { isDevelopmentEnv } from '@config/constants';

export default async (app: Application) => {
	if (isDevelopmentEnv()) {
		const morgan = await import('morgan');

		app.use(morgan.default('dev'));
	}
};
