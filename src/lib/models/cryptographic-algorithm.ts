import {
	type EncryptionKey,
	SymmetricKey,
	AsymmetricKey,
	type AsymmetricKeyPair,
	type CryptographicKey
} from './encryption-key';

export type AESGCMEncryptResult = { data: string; iv: ArrayBufferLike };
type EncryptResult = string | AESGCMEncryptResult;

/**
 * Abstracts the contract to generate a key pair for asymmetric encryption.
 */
export abstract class CryptographicAlgorithm {
	protected keyUsages: ReadonlyArray<KeyUsage>;

	constructor() {
		this.keyUsages = ['encrypt', 'decrypt'];
	}

	abstract generate(): Promise<CryptographicKey>;

	abstract encrypt(key: EncryptionKey, data: string): Promise<EncryptResult>;

	protected async encryptData(
		key: EncryptionKey,
		data: string,
		algorithm: Algorithm,
		keyFormat: Exclude<KeyFormat, 'jwk'>
	): Promise<string> {
		const cryptoKey: CryptoKey = await crypto.subtle.importKey(
			keyFormat,
			key.value,
			algorithm,
			true,
			['encrypt']
		);

		const encrypted = await crypto.subtle.encrypt(
			algorithm,
			cryptoKey,
			new TextEncoder().encode(data)
		);

		return Promise.resolve(String.fromCodePoint(...new Uint8Array(encrypted)));
	}
}

/**
 * Implements the contract defined in {@link CryptographicAlgorithm} to generate a key for symmetric encryption.
 */
export abstract class SymmetricCryptographicAlgorithm extends CryptographicAlgorithm {
	private algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params;

	constructor(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params) {
		super();
		this.algorithm = algorithm;
	}

	override async generate(): Promise<SymmetricKey> {
		crypto.subtle.digest;
		const keyPair: CryptoKey = await crypto.subtle.generateKey(
			this.algorithm,
			true,
			this.keyUsages
		);

		return SymmetricKey.private(await crypto.subtle.exportKey('raw', keyPair));
	}
}

/**
 * Implements the contract defined in {@link CryptographicAlgorithm} to generate a key pair for asymmetric encryption.
 */
export class AsymmetricCryptographicAlgorithm extends CryptographicAlgorithm {
	private algorithm: RsaHashedKeyGenParams | EcKeyGenParams;

	constructor(algorithm: RsaHashedKeyGenParams | EcKeyGenParams) {
		super();
		this.algorithm = algorithm;
	}

	override async generate(): Promise<AsymmetricKeyPair> {
		const keyPair: CryptoKeyPair = await crypto.subtle.generateKey(
			this.algorithm,
			true,
			this.keyUsages
		);

		return {
			public: AsymmetricKey.public(await crypto.subtle.exportKey('spki', keyPair.publicKey)),
			private: AsymmetricKey.private(await crypto.subtle.exportKey('pkcs8', keyPair.privateKey))
		};
	}

	override async encrypt(key: AsymmetricKey, data: string): Promise<string> {
		return super.encryptData(key, data, this.algorithm, 'spki');
	}
}
