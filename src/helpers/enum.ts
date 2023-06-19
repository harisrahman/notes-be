export function tryFrom<V extends string | number, K extends string>(
	_enum: Record<K, V>,
	value: string | number,
): Record<K, V>[K] | null;

export function tryFrom<V extends string | number, K extends string>(
	_enum: Record<K, V>,
	value: string | number,
	_default: V,
): Record<K, V>[K];

export function tryFrom<V extends string | number, K extends string>(
	_enum: Record<K, V>,
	value: string | number,
	_default?: V,
): Record<K, V>[K] | null {
	const foundKey = (Object.keys(_enum) as Array<K>).find(
		(key) => _enum[key] === value,
	);

	return foundKey ? _enum[foundKey] : _default || null;
}
