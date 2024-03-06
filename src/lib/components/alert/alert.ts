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

export type TabbedAlert = Alert & {
	tabs: { tab: string; value: string }[];
};

export type Action = [string, () => void];
