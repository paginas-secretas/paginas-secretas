import { Reactor, withVault } from '@core';
import { type CryptoEvent, isNewKeyPair, type NewKeyPair } from './event';
import { CryptoInitialized, type CryptoState, GenerationFailure, GenerationSuccess } from './state';

export class CryptoReactor extends Reactor<CryptoEvent, CryptoState> {
	constructor() {
		super(CryptoInitialized());

		super.on<NewKeyPair>(async (_, emit) => {
			const vault = withVault();

			try {
				const keyPair = await vault.asymmetricCrypto.generate();

				emit(GenerationSuccess(keyPair));
			} catch (error) {
				emit(GenerationFailure(`${error}`));
			}
		}, isNewKeyPair);
	}
}
