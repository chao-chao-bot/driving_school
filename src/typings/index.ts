export * from "./students";
export * from "./coach";
export * from "./exam";

export enum Status {
	READY = "ready",
	PAUSE = "pause",
	FINSH = "finsh"
}

export const StatusMap: Record<Status, string> = {
	[Status.READY]: "正在学习",
	[Status.PAUSE]: "已经暂停",
	[Status.FINSH]: "已经毕业"
};

export type ModalProps = {
	showModal: (params?: any) => void | undefined;
};

export type SearchNameKey = {
	[x: string]: string;
};
/** 选项 */
export type MapOption = { key: string | number; label: string; [key: string]: any };
/** 下拉 选项 */
export type SelectOption<T = any> = {
	value: string | number;
	label: string;
	disabled?: boolean;
	sequence?: number;
	extra?: T;
	[key: string]: any;
};
export type Raw = string | number;

export const DateFomat = "YYYY-MM-DD";
