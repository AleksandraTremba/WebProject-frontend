
interface ILocalStorageManager {
	storage: Storage;

	keyExists: (key: string) => boolean;
	read: (dataLabel: string) => string | null;
	write: (key: string, value: string) => void;
}

class LocalStorageManager implements ILocalStorageManager {
	storage: Storage;

	constructor() {
		this.storage = sessionStorage;
	}

	read(dataLabel: string): string | null {
		let data: string | null = this.storage.getItem(dataLabel);
		return data;
	}

	keyExists(key: string): boolean {
		return this.read(key) !== null;
	}

	write(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}
}

export { LocalStorageManager };