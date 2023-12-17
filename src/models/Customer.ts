import { HttpClient } from '@/api/HttpClient.ts';
import { LocalStorageManager } from '@/api/LocalStorage';

interface ICustomer {
	id: bigint;
	nickname: string;
	password: string;
	newData?: string;
	timerId?: bigint;
	token?: string;
}

interface ICustomerNetwork extends ICustomer {
	http: HttpClient;
	storage: LocalStorageManager;

	login: () => Promise<ICustomer>;
	login2: (copy: Customer) => void;

	register: () => Promise<ICustomer>;
	updateNickname: () => void;
	updatePassword: () => void;
	delete: () => void;
}

class Customer implements ICustomerNetwork {
	id!: bigint;
	isLogged: boolean = false;
	http: HttpClient;
	storage: LocalStorageManager;

	nickname!: string;
	password!: string;
	newData?: string | undefined;
	timerId?: bigint | undefined;
	token?: string | undefined;

	publicDomain: string = '/public/customers';
	privateDomain: string = 'customers';

	constructor(http?: HttpClient, storage?: LocalStorageManager) {
		this.http = http ?? new HttpClient();
		this.storage = storage ?? new LocalStorageManager();
	}

	private jsonify(): string {
		return JSON.stringify({
			username: this.nickname,
			password: this.password,
		});
	}

	private loadData(data: Customer) {
		this.id = data.id;
		this.nickname = data.nickname;
		this.timerId = data.timerId;
		this.token = data.token;
	}

	login(): Promise<ICustomer> {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		var promise: Promise<ICustomer> = this.http.post(dataObject, this.publicDomain + '/login');
		return promise;
	}

	login2(copy: Customer): void {
		console.log(copy.id);
		console.log(this.id);
		this.loadData(copy);
		console.log(this.id);
		this.storage.write('user-token', this.token);
	}

	register(): Promise<ICustomer> {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		var promise: Promise<ICustomer> = this.http.put(dataObject, this.publicDomain + '/register');
		return promise;
	}

	updateNickname(): void {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, this.privateDomain + '/update/username');
	}

	updatePassword(): void {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		this.http.post(dataObject, this.privateDomain + 'users/update/password');
	}

	delete(): void {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/delete');
	}

	cloneToType(): ICustomer {
		let tCustomer: ICustomer;
		tCustomer.id = this.id;
		tCustomer.nickname = this.nickname;
		tCustomer.timerId = this.timerId;
		tCustomer.token = this.token;

		return tCustomer;
	}
}

function retrieve(nickname: string): Promise<ICustomer> {
	var promise: Promise<ICustomer> = HttpClient.get(null, 'users/' + nickname);
	return promise;
}

export { Customer, retrieve };
export type { ICustomer as ICustomerType };
