export function wrapError(value: unknown) {
	return value instanceof Error ? value : new Error(`${value}`);
}
