export const isDevelopmentEnv = () => {
	const env = process.env.NODE_ENV || 'development';
	return env === 'development';
};

export const APP_KEY = process.env.APP_KEY || '6PJo7InifKDuxtjudSMptrE~FI0C';

export const LOG_LEVELS = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

export const LOG_LEVEL_COLORS = {
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	http: 'magenta',
	debug: 'white',
};

export const DATE_FORMAT = 'DD MMM YYYY';
export const DATE_TIME_FORMAT = 'DD MMM YY h:mm:ss A';
