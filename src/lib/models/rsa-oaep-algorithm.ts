import { CryptographicAlgorithm } from './cryptographic-algorithm';

/**
 * A {@link CryptographicAlgorithm} that uses `RSA-OAEP` with 2048 bit keys.
 */
export class RSAOAEPAlgorithm extends CryptographicAlgorithm {
	constructor() {
		super(<RsaHashedKeyGenParams>{
			name: 'RSA-OAEP',
			modulusLength: 2048,
			publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
			hash: { name: 'SHA-256' }
		});
	}
}
