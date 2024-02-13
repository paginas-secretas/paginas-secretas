type Request = {
	url: string;
	method: Method;
	headers: Headers;
	body: Object;
};

enum Method {
	get = 'GET',
	post = 'POST'
}

export abstract class Client {
	constructor(private readonly baseUrl: URL) {}

	public get(endpoint: string, headers?: Headers): Promise<Response> {
		const request = <Request>{
			url: this.resolveUrl(this.baseUrl, endpoint),
			method: Method.get,
			headers: headers ?? {}
		};

		return this.request(request);
	}

	public add(endpoint: string, body: Object, headers?: Headers): Promise<Response> {
		const request = <Request>{
			url: this.resolveUrl(this.baseUrl, endpoint),
			method: Method.post,
			headers: headers ?? {},
			body: body
		};

		return this.request(request);
	}

	private request(request: Request): Promise<Response> {
		const url = request.url;

		const fetchRequest = <RequestInit>{
			method: request.method,
			headers: request.headers,
			body: request.body
		};

		return fetch(url, fetchRequest);
	}

	private resolveUrl(baseUrl: URL, endpoint: string): string {
		const url = `${baseUrl}/${endpoint}`.replaceAll(/([^:]\/)\/+/g, '$1');
		return url;
	}
}
