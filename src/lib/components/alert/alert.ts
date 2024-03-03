export type Alert = {
	title: string;
	subtitle: string;
	action: Action;
};

export type MessageAlert = Alert & {
	message: string;
};

export type FailureAlert = Alert & {
	error?: Error;
};

export type Action = [string, () => void];
