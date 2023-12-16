import { HttpClient } from '@/api/HttpClient.ts';

interface ICustomer {
	id: bigint;
	nickname: string;
	password: string;
	newNickname?: string;
	newPassword?: string;
}

interface ICustomerNetwork extends ICustomer {
	http: HttpClient;

	login: () => void;
	register: () => void;
	updateNickname: () => void;
	updatePassword: () => void;
	delete: () => void;

}

export type TCustomer = {
	id: bigint;
	nickname: string;
	password: string;
};

export class Customer implements ICustomerNetwork {
	id!: bigint;
	isLogged: boolean = false;
	http: HttpClient;

	nickname!: string;
	password!: string;
	newNickname?: string | undefined;
	newPassword?: string | undefined;

	constructor() {
		this.http = new HttpClient();
	}

	private jsonify(): string {
		return JSON.stringify({
			id: this.id,
			username: this.nickname,
			password: this.password,
			newUsername: this.newNickname,
			newPassword: this.newPassword,
		});
	}

<<<<<<< HEAD
	retrieve(): Promise<TCustomer> {
		var promise: Promise<TCustomer> = this.http.get(null, '/users/' + 'admin');
		return promise;
=======
	private loadData(data: ICustomer) {
		this.id = data.id;
		this.nickname = data.nickname;
		this.password = data.password;
		this.newNickname = data.newNickname;
		this.newPassword = data.newPassword;
>>>>>>> dev-ts-migration
	}

	login(): void {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

<<<<<<< HEAD
		console.log(data);

		var promise: Promise<bool> = this.http.post(dataObject, '/users/login');
		return promise;
=======
		var promise: Promise<ICustomer> = this.http.post(dataObject, 'users/login');
		promise.then((result) => {
			console.log(result);
			this.loadData(result);
			this.isLogged = true;
		}, (err) => {
			console.log(err);
		});
>>>>>>> dev-ts-migration
	}

	register(): void {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

<<<<<<< HEAD
		console.log(data);

		var promise: Promise<ICustomer> = this.http.put(dataObject, '/users/register');
		return promise;
=======
		var promise: Promise<ICustomer> = this.http.put(dataObject, 'users/register');
		promise.then((result) => {
			console.log(result);
			this.login();
		}, (err) => {
			console.log(err);
		});
>>>>>>> dev-ts-migration
	}

	updateNickname(): void {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/update/username');
	}

	updatePassword(): void {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		this.http.post(dataObject, 'users/update/password');
	}

	delete(): void {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/delete');
	}
}

function retrieve(nickname: string): Promise<TCustomer> {
	var promise: Promise<TCustomer> = HttpClient.get(null, 'users/' + nickname);
	return promise;
}
