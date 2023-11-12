import { HttpClient } from '@/api/HttpClient.ts';

interface ITimer {
	id: bigint;
	customerId: bigint;
	initialTime: int;
	runningTime: int;
	isPaused: bool;
}

interface ITimerNetwork extends ITimer {
	http: HttpClient;

	create: () => void;
	start: () => Promise<T>;
	pause: () => Promise<T>;
	end: () => Promise<T>;
}

export class Timer implements ITimerNetwork {
	constructor() {
		this.http = new HttpClient();
		
		this.customerId = 54;
		this.initialTime = 60;
		this.runningTime = this.initialTime;
		this.isPaused = true;
	}
	
	jsonify(): string {
		return JSON.stringify({
			id: this.id,
			customerId: this.customerId,
		});
	}

	create(): void {
		const data = {
			headers: { },
			params: {
				id: this.id,
				customerId: this.customerId,
			}
		}
	
		var promise: Promise<T> = this.http.post(data, 'timers/create');
		promise.then((result) => {
				console.log(result);
				this.id = result.id;
			}, (err) => {
				console.log(err);
			});
	}

	start(): Promise<bool> {
		const data = {
			headers: { },
			params: {
				id: this.id,
			},
		}

		var promise: Promise<T> = this.http.post(data, 'timers/start');
		promise.then((result) => {
			console.log('Timer is activated');
			this.isPaused = false;
		}, (err) => {
			console.log(err);
		});
	}

	pause(): Promise<bool> {
		const data = {
			headers: { },
			params: {
				id: this.id,
			}
		};

		var promise: Promise<T> = this.http.post(data, 'timers/stop');
		promise.then((result) => {
			console.log('Timer is stopped');
			this.isPaused = true;
		}, (err) => {
			console.log(err);
		});
	}

	end(): Promise<bool> {
	}

	timeLeftAsPercentage(): number {
		return (this.runningTime / this.initialTime) * 100;
	}
}
