/**
 * Types a key used in asymmetric encryption [can either be a public or private key]
 */
class AsymmetricKey {
	private value: ArrayBuffer;
	private isPublic: boolean;

	/**
	 * Private constructor to require clients to use {@link AsymmetricKey.public} and {@link AsymmetricKey.private} API.
	 *
	 * @param value the bit string that represents the key
	 * @param isPublic if the key is public
	 */
	private constructor(value: ArrayBuffer, isPublic: boolean) {
		this.value = value;
		this.isPublic = isPublic;
	}

	/**
	 * Creates a new {@link AsymmetricKey} that represents a public key.
	 *
	 * @param value the bit string that represents the key
	 */
	static public(value: ArrayBuffer) {
		return new AsymmetricKey(value, true);
	}

	/**
	 * Creates a new {@link AsymmetricKey} that represents a private key.
	 *
	 * @param value the bit string that represents the key
	 */
	static private(value: ArrayBuffer) {
		return new AsymmetricKey(value, false);
	}

	/**
	 * Returns the asymmetric key in the text-readable, `.pem` format.
	 *
	 * Example:
	 *
	 * ```
	 * -----BEGIN PRIVATE KEY-----
	 * MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA43xnn4TTiNJZBLMT
	 * HfgxU4ZLNzNZK2vFMWzuGxnP1hVcnOPjBm5coDp2KTzZUmwQGiCYhoJRr1iMHmIM
	 * SFJC8QIDAQABAkASmuoesc5bMlj1eW/m05W1LxaXvStd0cKe+DnBHatR5uXbIWlx
	 * heL11o4b7WNK1dmJxoYIcRZzIPmoJS6AsqABAiEA+utubnKNcvl1sb/1CPjWqYos
	 * ArzfU6DvIRp5Enz5l5ECIQDoF4L9/V4GIVjUVyfBcBKEYhoJ/gZjfaCXqo58MCoF
	 * YQIhAPEw5VHdYwIlsHBP6CXbq9wEKRHoo3MruzDC1aZj4zdBAiBwz5TVPgUot6bE
	 * t4RUatQlUsXTW4zhaRvY/Ib7aDHUoQIgWTKsSDF9ODxCdTChmdI/6T7WYBJ2prqK
	 * Rud06t14Ycg=
	 * -----END PRIVATE KEY-----
	 * ```
	 */
	toString(): string {
		const encoded = btoa(String.fromCodePoint(...new Uint8Array(this.value)));

		if (this.isPublic) {
			return `-----BEGIN PUBLIC KEY-----\n${encoded}\n-----END PUBLIC KEY-----`;
		} else {
			return `-----BEGIN PRIVATE KEY-----\n${encoded}\n-----END PRIVATE KEY-----`;
		}
	}
}

/**
 * Types the output of a {@link CryptographicAlgorithm} key generation.
 */
export interface AsymmetricKeyPair {
	public: AsymmetricKey;
	private: AsymmetricKey;
}

/**
 * Abstracts the contract to generate a key pair for asymmetric encryption.
 */
export abstract class CryptographicAlgorithm {
	private algorithm: RsaHashedKeyGenParams;

	constructor(algorithm: RsaHashedKeyGenParams) {
		this.algorithm = algorithm;
	}

	async generate(): Promise<AsymmetricKeyPair> {
		const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];

		const keyPair: CryptoKeyPair = await crypto.subtle.generateKey(this.algorithm, true, keyUsages);

		return {
			public: AsymmetricKey.public(await crypto.subtle.exportKey('spki', keyPair.publicKey)),
			private: AsymmetricKey.private(await crypto.subtle.exportKey('pkcs8', keyPair.privateKey))
		};
	}
}
