import { HttpClient } from '@/api/HttpClient.ts';

export enum Status {
	todo = "TODO",
	working = "WORKING",
	done = "DONE",
}

interface ITask {
	id: bigint;
	customerId: bigint;
	title: string;
	description: string;
	status: Status;
}

export class Task implements ITask {
	id: bigint;
	customerId: bigint;
	title: string;
	description: string;
	status: Status;

	constructor(id: bigint = BigInt(0), customerId: bigint = BigInt(1), title: string, description: string = "", status: Status = Status.todo) {
		this.id = id;
		this.customerId = customerId;
		this.title = title;
		this.description = description;
		this.status = status;
	}
}

interface ITaskHandler {
	http: HttpClient;
	tasks: Map<bigint, Task>;

	create: (task: Task) => Promise<T>;
	load: (customerId: bigint) => Promise<T>;
	edit: (task: Task) => Promise<T>;
	delete: (task: Task) => Promise<T>;
}


export class TaskHandler implements ITaskHandler {
	http: HttpClient;
	tasks: Map<bigint, Task>;

	constructor(http?: HttpClient) {
		this.http = http ?? new HttpClient();
		this.tasks = new Map<bigint, Task>();
	}

	jsonify(task: Task): string {
		return JSON.stringify({
			id: task.id.toString(),
			customerId: task.customerId.toString(),
			title: task.title,
			description: task.description,
			status: task.status,
		});
	}

	jsonifyCreation(task: Task): string {
		return JSON.stringify({
			customerId: task.customerId.toString(),
			title: task.title,
			description: task.description,
			status: task.status,
		});
	}

	create(task: Task): Promise<T> {
		const data: string = this.jsonifyCreation(task);
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		var isDone: boolean = false;

		var promise: Promise<T> = this.http.put(dataObject, '/tasks/create');
		return promise;
	}

	addTask(task: Task): void {
		this.tasks.set(task.id, task);
	}

	load(customerId: bigint): Promise<T> {
		var promise: Promise<T> = this.http.get(null, "/tasks/?customerId=" + customerId);
		return promise;
	}

	edit(task: Task): Promise<T> {
		let data = this.jsonify(task);
		const dataObj = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};
		
		var isDone: boolean = false;

		var promise: Promise<T> = this.http.post(dataObj, '/tasks/update');
		return promise;
	}

	editTask(task: Task): void {
		this.tasks.set(task.id, task);
	}

	delete(task: Task): Promise<T> {
		var promise: Promise<T> = this.http.delete(null, '/tasks/' + task.id);
		return promise;
	}

	deleteTask(id: bigint) {
		this.tasks.delete(id);
	}
}
