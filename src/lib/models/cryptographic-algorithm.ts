export abstract class CryptographicAlgorithm {
	private algorithm: RsaHashedKeyGenParams;

	constructor(algorithm: RsaHashedKeyGenParams) {
		this.algorithm = algorithm;
	}

	async generate(): Promise<CryptoKeyPair> {
		const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];

		const keyPair: CryptoKeyPair = await crypto.subtle.generateKey(this.algorithm, true, keyUsages);

		return keyPair;
	}
}
