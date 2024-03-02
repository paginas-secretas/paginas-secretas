import { isTypedOf } from '@core';

export function NewKeyPair() {
	return {
		type: 'new-key-pair' as const
	};
}

export type NewKeyPair = ReturnType<typeof NewKeyPair>;

export type CryptoEvent = NewKeyPair;

export const isNewKeyPair = (event: CryptoEvent) => isTypedOf<NewKeyPair>(event, 'new-key-pair');
