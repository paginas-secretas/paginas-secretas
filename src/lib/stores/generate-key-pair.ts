import { createStore, setSuccess, type Store } from './store';
import {
	AsymmetricCryptographicAlgorithm,
	RSAOAEPAlgorithm,
	type AsymmetricKeyPair
} from '@models';

type GenerateKeyPairState = AsymmetricKeyPair;

export function createGenerateKeyPairStore() {
	const store = createStore<GenerateKeyPairState>();
	const asymmetricCryptoAlgorithm = new RSAOAEPAlgorithm();
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
