import { Reactor, withVault, wrapError } from '@core';
import { type CryptoEvent, isNewKeyPair, type NewKeyPair } from './event';
import { CryptoInitialized, type CryptoState, GenerationFailure, GenerationSuccess } from './state';
import { logError } from '@web-pacotes/lumberdash';

export class CryptoReactor extends Reactor<CryptoEvent, CryptoState> {
	constructor() {
		super(CryptoInitialized());

		super.on<NewKeyPair>(async (_, emit) => {
			const vault = withVault();

			try {
				const keyPair = await vault.asymmetricCrypto.generate();
				emit(GenerationSuccess(keyPair));

				vault.cryptoCache.cache(keyPair);
			} catch (error) {
				const wrapped = wrapError(error);
				logError(wrapped);

				emit(GenerationFailure(wrapped));
			}
		}, isNewKeyPair);
	}
}
