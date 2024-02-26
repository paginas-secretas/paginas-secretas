export abstract class EncryptionKey {
	public readonly value: ArrayBuffer;

	constructor(value: ArrayBuffer) {
		this.value = value;
	}
}

/**
 * Types a key used in asymmetric encryption [can either be a public or private key]
 */
export class AsymmetricKey extends EncryptionKey {
	public readonly isPublic: boolean;

	/**
	 * Private constructor to require clients to use {@link AsymmetricKey.public} and {@link AsymmetricKey.private} API.
	 *
	 * @param value the bit string that represents the key
	 * @param isPublic if the key is public
	 */
	private constructor(value: ArrayBuffer, isPublic: boolean) {
		super(value);
		this.isPublic = isPublic;
	}

	/**
	 * Creates a new {@link AsymmetricKey} that represents a public key.
	 *
	 * @param value the bit string that represents the key
	 */
	static public(value: ArrayBuffer | string) {
		const buffer = typeof value === 'string' ? importPem(value) : value;

		return new AsymmetricKey(buffer, true);
	}

	/**
	 * Creates a new {@link AsymmetricKey} that represents a private key.
	 *
	 * @param value the bit string that represents the key
	 */
	static private(value: ArrayBuffer | string) {
		const buffer = typeof value === 'string' ? importPem(value) : value;

		return new AsymmetricKey(buffer, false);
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
 * Types a key used in symmetric encryption
 */
export class SymmetricKey extends EncryptionKey {
	/**
	 * Private constructor to require clients to use {@link SymmetricKey.private} API.
	 *
	 * @param value the bit string that represents the key
	 */
	private constructor(value: ArrayBuffer) {
		super(value);
	}

	/**
	 * Creates a new {@link SymmetricKey} that represents a private key.
	 *
	 * @param value the bit string that represents the key
	 */
	static private(value: ArrayBuffer | string) {
		const buffer = typeof value === 'string' ? importPem(value) : value;

		return new SymmetricKey(buffer);
	}

	/**
	 * Returns the symmetric key in the text-readable, `.pem` format.
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

		return `-----BEGIN PRIVATE KEY-----\n${encoded}\n-----END PRIVATE KEY-----`;
	}
}

/**
 * Types the output of a {@link AsymmetricCryptographicAlgorithm} key generation.
 */
export interface AsymmetricKeyPair {
	public: AsymmetricKey;
	private: AsymmetricKey;
}

export type CryptographicKey = SymmetricKey | AsymmetricKeyPair;

export function arrayBuffer(data: string) {
	const bytes = new Uint8Array(data.length);

	for (let i = 0; i < data.length; i++) {
		bytes[i] = data.charCodeAt(i);
	}

	return bytes.buffer;
}

function importPem(pem: string): ArrayBufferLike {
	const b64 = pem.replaceAll(/(-----([A-Z ]{14,21})-----)|\n/g, '');
	const byteStr = atob(b64);
	return arrayBuffer(byteStr);
}
