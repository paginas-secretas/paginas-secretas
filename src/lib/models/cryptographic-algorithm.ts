interface AsymmetricKeyPair {
	public: ArrayBuffer;
	private: ArrayBuffer;
}

export abstract class CryptographicAlgorithm {
	private algorithm: RsaHashedKeyGenParams;

	constructor(algorithm: RsaHashedKeyGenParams) {
		this.algorithm = algorithm;
	}

	async generate(): Promise<AsymmetricKeyPair> {
		const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];

		const keyPair: CryptoKeyPair = await crypto.subtle.generateKey(this.algorithm, true, keyUsages);

		return {
			public: await crypto.subtle.exportKey('spki', keyPair.publicKey),
			private: await crypto.subtle.exportKey('spki', keyPair.privateKey)
		};
	}
}
