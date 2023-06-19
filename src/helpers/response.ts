import { Response } from 'express';
import { GenericObject } from '@customTypes/index';
import HttpStatusCode from '@customTypes/HttpStatusCode';
import { spacedCase } from '@helpers/string';

const getHttpStatus = (code: HttpStatusCode): string =>
	spacedCase(HttpStatusCode[code]);

const getResponseObj = (
	message: string,
	status: string | null,
	code: HttpStatusCode,
	data: GenericObject | Array<unknown>,
) => {
	const statusText =
		typeof status === 'string' && status.length > 0
			? status
			: getHttpStatus(code);

	return {
		meta: {
			status: statusText,
			code,
			message,
			timestamp: new Date().toISOString(),
		},
		data,
	};
};

export const successRes = (
	res: Response,
	data: GenericObject | Array<unknown> = {},
	message = '',
	status: string | null = null,
	code: HttpStatusCode = HttpStatusCode.Success,
) => res.status(code).json(getResponseObj(message, status, code, data));

export const failedRes = (
	res: Response,
	message = '',
	code: HttpStatusCode = HttpStatusCode.ServerError,
	status: string | null = null,
	data: GenericObject | Array<unknown> = {},
) => res.status(code).json(getResponseObj(message, status, code, data));
