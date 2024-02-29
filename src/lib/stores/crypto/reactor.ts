import { Reactor, withVault } from '@core';
import type { CryptoEvent, NewKeyPair } from './event';
import type { CryptoState } from './state';

export class CryptoReactor extends Reactor<CryptoEvent, CryptoState> {
	constructor() {
		super({});

		super.on<NewKeyPair>(
			async (_, emit) => {
				const vault = withVault();

				try {
					const keyPair = await vault.asymmetricCrypto.generate();

					emit(keyPair);
				} catch (error) {
					emit({ message: `${error}` });
				}
			},
			(event) => Object.keys(event).length === 0
		);
	}
}
