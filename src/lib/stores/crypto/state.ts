import type { AsymmetricKeyPair } from '@models';
import { isTypedOf } from '@core';

export function CryptoInitialized() {
	return { type: 'crypto-initialized' as const };
}

export function GenerationSuccess(value: AsymmetricKeyPair) {
	return {
		value: value,
		type: 'generation-success' as const
	};
}

export function GenerationFailure(value: Error) {
	return {
		value: value,
		type: 'generation-failure' as const
	};
}

export type CryptoInitialized = ReturnType<typeof CryptoInitialized>;
export type GenerationSuccess = ReturnType<typeof GenerationSuccess>;
export type GenerationFailure = ReturnType<typeof GenerationFailure>;

export type CryptoState = CryptoInitialized | GenerationSuccess | GenerationFailure;

export const isGenerationSuccess = (state: CryptoState): state is GenerationSuccess =>
	isTypedOf<GenerationSuccess>(state, 'generation-success');

export const isGenerationFailure = (state: CryptoState): state is GenerationFailure =>
	isTypedOf<GenerationFailure>(state, 'generation-failure');
