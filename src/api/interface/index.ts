// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	desc: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		name: string;
		password: string;
		confirm_password?: string;
	}
	export interface ResLogin {
		id: number;
		name: string;
		access_token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
