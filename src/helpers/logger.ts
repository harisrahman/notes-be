import winston from 'winston';
import {
	isDevelopmentEnv,
	LOG_LEVELS,
	LOG_LEVEL_COLORS,
} from '@config/constants';
import { Entries } from '@customTypes/index';

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => (isDevelopmentEnv() ? 'debug' : 'warn');

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(LOG_LEVEL_COLORS);

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp({ format: 'HH:mm:ss' }),

	winston.format((info) => ({
		...info,
		level: info.level.toUpperCase(),
	}))(),

	// Tell Winston that the logs must be colored
	winston.format.colorize({ level: true }),

	winston.format.errors({ stack: true }),

	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf(
		({ level: fLevel, message, timestamp, stack }) =>
			// print log trace
			// timestamp gray colored and bold (with ANSI terminal escape codes)
			`[${fLevel}] \x1b[1m\x1b[90m${timestamp}\x1b[0m ${message} ${
				stack ? `- ${stack}` : ''
			}`,
	),
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
	// Allow the use the console to print the messages
	new winston.transports.Console(),

	// Allow to print all the error level messages inside the error.log file
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),

	// Allow to print all the error message inside the all.log file
	// (also the error log that are also printed inside the error.log(
	new winston.transports.File({ filename: 'logs/all.log' }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston.createLogger({
	level: level(),
	levels: LOG_LEVELS,
	format,
	transports,
});

export const logAlways = (
	message: string,
	fLevel: keyof typeof LOG_LEVELS = 'info',
) => {
	// Find highest level and apply it, so that log is enabled for all level
	const highestLevel = (
		Object.entries(Logger.levels) as Entries<typeof LOG_LEVELS>
	).reduce((prevLevel, currentLevel) =>
		currentLevel[1] > prevLevel[1] ? currentLevel : prevLevel,
	)[0];

	Logger.level = highestLevel;
	Logger[fLevel](message);
	// Revert the level back to normal
	Logger.level = level();
};

export default Logger;
