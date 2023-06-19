import { UserType, ResDataType } from '@customTypes/index';

declare module 'express-serve-static-core' {
	export interface Request {
		authUser?: UserType;
	}
	export interface Response {
		dataType?: ResDataType;
	}
}
