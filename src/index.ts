import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import methodOverride from 'method-override';
import path from 'path';

import connectDB from '@config/db';
import loggingInit from '@config/logging';
import resGlobals from '@middleware/resGlobals';
import routerInit from '@routes/index';
import { logAlways } from '@helpers/logger';

const cwd = path.resolve('src');

// Add environment variables
dotenv.config({ path: path.join(cwd, 'config/.env') });

connectDB();

// Express Init
const app = express();

// Middlewares
app.use(
	express.json({
		limit: '30mb', // maximum request body size
	}),
	express.urlencoded({
		limit: '30mb', // maximum request body size
		extended: true, // qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
	}),

	cors(), // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

	methodOverride('_method', {
		methods: ['POST', 'GET'],
	}), // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.

	resGlobals,
);

// app.use('*', reqGlobals);

(async () => {
	// Logging is async function, wait for it to finish before starting the router
	await loggingInit(app);
	routerInit(app);

	const PORT = process.env.PORT || 5000;

	app.listen(PORT, () => {
		logAlways(`Sever running on port: ${PORT}`);
	});
})();
