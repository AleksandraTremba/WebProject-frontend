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

	create: (task: Task) => boolean;
	load: (customerId: bigint) => void;
	edit: (task: Task) => boolean;
	delete: (id: bigint) => boolean;
}


export class TaskHandler implements ITaskHandler {
	http: HttpClient;
	tasks: Map<bigint, Task>;

	constructor() {
		this.http = new HttpClient();
		this.tasks = new Map<bigint, Task>();

		this.load(1n);
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

	create(task: Task): boolean {
		const data: string = this.jsonify(task);
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		console.log(dataObject);

		var isDone: boolean = false;

		var promise: Promise<T> = this.http.put(dataObject, 'tasks/create');
		promise.then((result) => {
			console.log(result);
			this.tasks.set(task.id, task);
			isDone = true;
		}, (err) => {
			console.log(err);
		});

		return isDone;
	}

	load(customerId: bigint): void {
		const data = {
			headers: { },
			params: {
				customerId: customerId,
			}
		}
		var isLoaded: boolean = false;

		var promise: Promise<T> = this.http.get(null, "tasks");
		promise.then((result) => {
			console.log(result);
			result.forEach((el) => {
				this.tasks.set(el.id, el);
			})
			console.log(this.tasks);
		}, (err) => {
			console.log(err);
		});
	}

	edit(task: Task): boolean {
		const data = {
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				id: task.id,
				customerId: task.customerId,
				title: task.title,
				description: task.description,
				status: task.status,
			}
		};
		
		var isDone: boolean = false;

		var promise: Promise<T> = this.http.put(data, 'tasks/create');
		promise.then((result) => {
			console.log(result);
			
			if (this.tasks.has(task.id)) {
				this.tasks.set(task.id, task);
				isDone = true;
			}
		}, (err) => {
			console.log(err);
		});

		return isDone;
	}

	delete(id: bigint): boolean {
		var isDone: boolean = false;
		const task: Task | undefined = this.tasks.get(id);
		
		if (task !== undefined) {
			const data = {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					id: task.id,
					customerId: task.customerId,
					title: task.title,
					description: task.description,
					status: task.status,
				}
			};

			var promise: Promise<T> = this.http.put(data, 'tasks/create');
			promise.then((result) => {
				console.log(result);
				
				if (this.tasks.has(task.id)) {
					this.tasks.delete(task.id);
					isDone = true;
				}
			}, (err) => {
				console.log(err);
			});
		}

		return isDone;
	}
}
