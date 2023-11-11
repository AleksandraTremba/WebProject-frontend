import { HttpClient } from '@/api/HttpClient.ts';

interface ICustomer {
	nickname: string;
	password: string;
	newUsername?: string;
	newPassword?: string;
}

interface ICustomerNetwork extends ICustomer {
	http: HttpClient;

	login: () => void;
	register: () => void;
	update: () => void;
	delete: () => void;

}

export type TCustomer = {
	nickname: string;
	password: string;
};

export class Customer implements ICustomerNetwork {
	isLogged: bool = false;

	constructor() {
		this.isLogged = false;
		this.http = new HttpClient();
	}

	jsonify(): string {
		return JSON.stringify({
			username: this.nickname,
			password: this.password,
			newUsername: this.newUsername,
			newPassword: this.newPassword,
		});
	}

	retrieve(): Promise<TCustomer> {
		var promise: Promise<TCustomer> = this.http.get(null, 'users/' + 'admin');
		return promise;
	}

	login(): Promise<bool> {
		let data: string = this.jsonify();	

		var promise: Promise<bool> = this.http.post(data, 'users/login');
		return promise;
	}

	register(): Promise<ICustomer> {
		let data: string = this.jsonify();
		console.log(data);

		var promise: Promise<any> = this.http.post(data, 'users/register');
		return promise;
	}

	updateUsername(): Promise<bool> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/update/username');
	}

	updatePassword(): Promise<bool> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/update/password');
	}

	delete(): Promise<TCustomer> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/delete');
	}
}

