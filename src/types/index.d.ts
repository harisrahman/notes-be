/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericObject = { [key: string]: any };

export type ResDataType = 'xml' | 'json' | 'script' | 'html';

export type ValueOf<T> = T[keyof T];

// Type-safe Object.entries
export type Entries<T> = {
	[K in keyof T]: [K, ValueOf<T>];
}[keyof T][];
