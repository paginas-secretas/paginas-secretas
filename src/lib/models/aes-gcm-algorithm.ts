import { SymmetricCryptographicAlgorithm } from './cryptographic-algorithm';
import type { SymmetricKey } from './encryption-key';

/**
 * A {@link SymmetricCryptographicAlgorithm} that uses `AES-GCM` with length 256.
 */
export class AESGCMAlgorithm extends SymmetricCryptographicAlgorithm {
	constructor() {
		super(<AesKeyGenParams>{
			name: 'AES-GCM',
			length: 256
		});
	}

	override async encrypt(key: SymmetricKey, data: string): Promise<string> {
		const encryptAlgorithm = <AesGcmParams>{
			name: 'AES-GCM',
			iv: crypto.getRandomValues(new Uint8Array(12))
		};
		return super.encryptData(key, data, encryptAlgorithm, 'raw');
	}
}
