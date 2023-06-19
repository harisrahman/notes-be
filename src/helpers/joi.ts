import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Joi, { ValidationError, ObjectSchema, AnySchema } from 'joi';

const transformError = (errors: ValidationError) => {
	const prettyErrors: { [key: string]: string } = {};

	errors.details.forEach((error) => {
		prettyErrors[error.path.join('.')] = error.message;
	});

	return prettyErrors;
};

export const handleError = (res: Response, error: unknown) => {
	let errors;

	if (error instanceof ValidationError) {
		errors = transformError(error);
	} else if (error instanceof Error) {
		errors = error.message;
	} else {
		errors = error;
	}

	res.status(400).json(errors);

	return false;
};

const joiOptions = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: '',
		},
	},
};

export const joiValidator = (
	schema: ObjectSchema<unknown>,
	req: Request,
	res: Response,
) => {
	const { error, value } = schema.validate(req.body, joiOptions);

	if (error) return handleError(res, error);

	return value;
};

export const joiValidatorAsync = async <T>(
	schema: ObjectSchema<T>,
	req: Request,
	res: Response,
) => {
	try {
		return await schema.validateAsync(req.body, joiOptions);
	} catch (error) {
		return handleError(res, error);
	}
};

export const objectId = (required = true) => {
	let rules = Joi.string().alphanum().length(24);

	if (required) rules = rules.required();

	return rules;
};

export const unique =
	(
		key: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		model: mongoose.Model<any>,
		errorMsg: string,
		exceptionObjId?: string,
	) =>
	async (value: unknown) => {
		const doc = await model.findOne({ [key]: value });

		if (doc && doc.id !== exceptionObjId) {
			const cause = `external.${key}`;

			throw new ValidationError(
				cause,
				[
					{
						message: errorMsg,
						path: [key],
						type: cause,
						context: {
							key,
							label: key,
							value,
						},
					},
				],
				value,
			);
		}
	};

export const stripEmptyString = (schema: AnySchema) => [
	Joi.allow('').only().strip(),
	schema,
];
