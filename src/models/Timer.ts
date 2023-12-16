import { HttpClient } from '@/api/HttpClient.ts';

interface ITimer {
	id: bigint;
	customerId: bigint;
	initialTime: number;
	runningTime: number;
	isPaused: boolean;
}

interface ITimerNetwork extends ITimer {
	http: HttpClient;

	create: () => void;
	start: () => void;
	pause: () => void;
}

export class Timer implements ITimerNetwork {
	http: HttpClient;

	id!: bigint;
	customerId!: bigint;
	initialTime: number;
	runningTime: number;
	isPaused: boolean;

	constructor() {
		this.http = new HttpClient();
		
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
				customerId: this.customerId,
			}
		}
	
		var promise: Promise<T> = this.http.post(data, '/timers/create');
		promise.then((result) => {
				console.log(result);
				this.id = result.id;
			}, (err) => {
				console.log(err);
			});
	}

	start(): void {
		const data = {
			headers: { },
			params: {
				id: this.id,
			},
		}

		var promise: Promise<T> = this.http.post(data, '/timers/start');
		promise.then((result) => {
			console.log('Timer is activated');
			this.isPaused = false;
		}, (err) => {
			console.log(err);
		});
	}

	pause(): void {
		const data = {
			headers: { },
			params: {
				id: this.id,
			}
		};

		var promise: Promise<T> = this.http.post(data, '/timers/stop');
		promise.then((result) => {
			console.log('Timer is stopped');
			this.isPaused = true;
		}, (err) => {
			console.log(err);
		});
	}

	timeLeftAsPercentage(): number {
		return (this.runningTime / this.initialTime) * 100;
	}
}
