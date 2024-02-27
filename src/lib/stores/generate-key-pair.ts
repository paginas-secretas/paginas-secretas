import { withVault } from '@core';
import type { AsymmetricCryptographicAlgorithm, AsymmetricKeyPair } from '@models';
import { createStore, setSuccess, type Store } from './store';

type GenerateKeyPairState = AsymmetricKeyPair;

export function createGenerateKeyPairStore() {
	const vault = withVault();

	const store = createStore<GenerateKeyPairState>();
	const asymmetricCryptoAlgorithm = vault.asymmetricCrypto;
	const subscribe = store.subscribe;

	return {
		subscribe,
		generate: () => triggerGenerateKeyPair(store, asymmetricCryptoAlgorithm)
	};
}

async function triggerGenerateKeyPair(
	store: Store<GenerateKeyPairState>,
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm
) {
	const keyPair = await asymmetricCryptoAlgorithm.generate();

	return setSuccess(store, keyPair);
}
