import { HttpClient } from '@/api/HttpClient.ts';
import { LocalStorageManager } from '@/api/LocalStorage';

interface ICustomer {
	id: bigint;
	nickname: string;
	password: string;
	newData?: string;
	groupId?: bigint;
	timerId?: bigint;
	token?: string;
}

interface ICustomerNetwork extends ICustomer {
	http: HttpClient;
	storage: LocalStorageManager;

	login: () => Promise<ICustomer>;
	login2: (copy: Customer) => void;

	register: () => Promise<ICustomer>;
	updateNickname: () => Promise<ICustomer>;
	updatePassword: () => Promise<ICustomer>;
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
	groupId?: bigint | undefined;
	timerId?: bigint | undefined;
	token?: string | undefined;

	publicDomain: string = '/public/customers';
	privateDomain: string = '/customers';

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

	public jsonifyPub(): string {
		return JSON.stringify({
			id: this.id,
			username: this.nickname,
		});
	}

	private loadData(data: Customer) {
		this.id = data.id;
		this.nickname = data.nickname;
		this.groupId = data.groupId;
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
		this.loadData(copy);
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

	updateNickname(): Promise<ICustomer> {
		let data: string = this.jsonify();
		console.log(data);

		var promise: Promise<ICustomer> = this.http.post(data, this.privateDomain + '/update/username');
		return promise;
	}

	updatePassword(): Promise<ICustomer> {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		var promise: Promise<ICustomer> = this.http.post(dataObject, this.privateDomain + '/update/password');
		return promise;
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
		tCustomer.groupId = this.groupId;
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
