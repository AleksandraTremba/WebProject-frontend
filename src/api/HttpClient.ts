import axios from 'axios';

interface IHttpClient {
	url: string;
	port: string;
	
	get: (data: string, path: string) => Promise<T>;
	post: (data: object, path: string) => Promise<T>;
	put: (data: object, path: string) => Promise<T>;
}

class HttpClient implements IHttpClient {
	url: string;
	port: string;

	constructor(url: string = "localhost", port: string = "8080") {
		this.url = url;
		this.port = port;
	}

	getURL(): string {
		// return this.port + "/api";
		return '/api';
	}

	injectSecurityHeader(token: string): void {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	get(data: string, path: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			axios({
				method: 'get',
				url: this.getURL() + path,
				data: data
			})
				.then((response) => {
					resolve(response.data);
				}, (err) => {
					console.log(err);
					reject(err);
				});
		});
	}

	post(data: object, path: string): Promise<T> {
		const config = {
			method: 'post',
			url: this.getURL() + path,
		};
		return new Promise<T>((resolve, reject) => {
			axios({...config, ...data})
				.then((response) => {
					resolve(response.data);	
				}, (err) => {
					console.log(err);
					reject(err);
				});
		});
	}

	put(data: object, path: string): Promise<T> {
		const config = {
			method: 'put',
			url: this.getURL() + path,
		};
		return new Promise<T>((resolve, reject) => {
			axios({...config, ...data})
				.then((response) => {
					resolve(response.data);	
				}, (err) => {
					console.log(err);
					reject(err);
				});
		});
	}

	delete(data: object, path: string): Promise<T> {
		const config = {
			method: 'delete',
			url: this.getURL() + path,
		};
		return new Promise<T>((resolve, reject) => {
			axios({...config, ...data})
				.then((response) => {
					resolve(response.data);	
				}, (err) => {
					console.log(err);
					reject(err);
				});
		});
	}
}

export { HttpClient };