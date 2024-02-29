import type { AsymmetricKeyPair } from '@models';

export type GenerationSuccess = AsymmetricKeyPair;
export type GenerationFailure = { message: string };

export type CryptoState = GenerationSuccess | GenerationFailure | {};
