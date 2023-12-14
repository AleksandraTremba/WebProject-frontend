import axios from 'axios';

interface IHttpClient {
	url: string;
	port: number;
	
	get: () => void;
	post: () => bool;
}

export class HttpClient implements IHttpClient {
	constructor(url: string = "localhost", port: number = "8080") {
		this.url = url;
		this.port = port;
	}

	getURL(): string {
		return "/api";
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
}
