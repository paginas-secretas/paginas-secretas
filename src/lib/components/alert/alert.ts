export interface Alert {
	title: string;
	subtitle: string;
	message: string;
	action: Action;
}

export type Action = [string, () => void];
