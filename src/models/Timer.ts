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

	start: () => void;
	pause: () => void;
	reset: () => void;
}

export class Timer implements ITimerNetwork {
	http: HttpClient;

	id!: bigint;
	customerId!: bigint;
	initialTime: number;
	runningTime: number;
	isPaused: boolean;

	constructor(http?: HttpClient) {
		this.http = http ?? new HttpClient();
		
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

	jsonifyStart(): string {
		return JSON.stringify({
			id: this.id,
			runningTime: this.initialTime,			
		});
	}

	start(): void {
		let data: string = this.jsonifyStart();
		const dataObj = {
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + sessionStorage.getItem('user-token'),
			},
			data,
		}

		var promise: Promise<T> = this.http.post(dataObj, '/timers/start');
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

	reset(): void {
		let data: string = this.jsonify();
		const dataObj = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		}

		var promise: Promise<T> = this.http.post(dataObj, '/timers/reset');
		promise.then((result) => {
			console.log(result);
			this.runningTime = result.runningTime;
		}, (err) => {
			alert("Something went wrong with the server!");
			console.log(err);
		})
	}

	timeLeftAsPercentage(): number {
		return (this.runningTime / this.initialTime) * 100;
	}
}
