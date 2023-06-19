import mongoose from 'mongoose';
import { getErrorMsg } from '@helpers/string';
import Logger from '@helpers/logger';

// eslint-disable-next-line consistent-return
const connectDB = async () => {
	const CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING as string;
	const DB_NAME = process.env.DATABASE_NAME as string;

	try {
		const conn = await mongoose.connect(CONNECTION_STRING, {
			dbName: DB_NAME,
		});
		Logger.info(`MongoDB Connected: ${conn.connection.host}`);

		return conn.connection.getClient();
	} catch (error) {
		Logger.error(getErrorMsg(error));
		process.exit(1);
	}
};

export default connectDB;
