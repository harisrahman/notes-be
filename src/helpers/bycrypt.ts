import { genSaltSync, hashSync } from 'bcryptjs';

export const hash = (value: string) => {
	const salt = genSaltSync();
	const result = hashSync(value, salt);

	return result;
};
