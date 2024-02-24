import {
	SymmetricCryptographicAlgorithm,
	type AESGCMEncryptResult
} from './cryptographic-algorithm';
import type { EncryptionKey, SymmetricKey } from './encryption-key';

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

	override async encrypt(key: SymmetricKey, data: string): Promise<AESGCMEncryptResult> {
		const iv = crypto.getRandomValues(new Uint8Array(12));
		const encryptAlgorithm = <AesGcmParams>{
			name: 'AES-GCM',
			iv: iv
		};

		const encrypted: string = await super.encryptData(key, data, encryptAlgorithm, 'raw');

		return <AESGCMEncryptResult>{
			data: encrypted,
			iv: iv.buffer
		};
	}

	override async decrypt(key: EncryptionKey, data: AESGCMEncryptResult): Promise<string> {
		const encryptAlgorithm = <AesGcmParams>{
			name: 'AES-GCM',
			iv: data.iv
		};

		const decrypted: string = await super.decryptData(key, data.data, encryptAlgorithm, 'raw');

		return decrypted;
	}
}
