import { AsymmetricCryptographicAlgorithm } from './cryptographic-algorithm';

/**
 * A {@link AsymmetricCryptographicAlgorithm} that uses `RSA-OAEP` with 2048 bit keys.
 */
export class RSAOAEPAlgorithm extends AsymmetricCryptographicAlgorithm {
	constructor() {
		super(<RsaHashedKeyGenParams>{
			name: 'RSA-OAEP',
			modulusLength: 2048,
			publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
			hash: { name: 'SHA-256' }
		});
	}
}
