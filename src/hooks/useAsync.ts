import * as React from "react";
import { useMountedRef } from "./useMountedRef";

enum Stat {
	IDEL = "idle",
	LOADING = "loading",
	ERROR = "error",
	SUCCESS = "success"
}

interface State<D> {
	error: Error | null;
	data: D | null;
	stat: Stat;
}

const defaultConfig = {
	throwOnError: false
};
const defaultInitState: State<null> = {
	stat: Stat.IDEL,
	data: null,
	error: null
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
	const mountedRef = useMountedRef();
	const callback = React.useCallback(
		(...args: T[]) => {
			return mountedRef.current ? dispatch(...args) : void 0;
		},
		[dispatch, mountedRef]
	);
	return callback;
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
	const config = { ...defaultConfig, initialConfig };
	const raducer = (state: State<D>, action: Partial<State<D>>) => {
		return { ...state, ...action };
	};

	const [state, dispacth] = React.useReducer(raducer, {
		...defaultInitState,
		...initialState
	});

	const safeDispatch = useSafeDispatch(dispacth);
	//惰性初始化：useState直接传入函数是惰性初始化，函数的返回值会存储到state中
	const [retry, setRetry] = React.useState(() => () => {
		return;
	});

	const setData = React.useCallback(
		(data: D) =>
			safeDispatch({
				data,
				stat: Stat.SUCCESS,
				error: null
			}),
		[safeDispatch]
	);

	const setError = React.useCallback(
		(error: Error) =>
			safeDispatch({
				error,
				stat: Stat.ERROR,
				data: null
			}),
		[safeDispatch]
	);

	const run = React.useCallback(
		(promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
			if (!promise || !promise.then) {
				throw new Error("请传入Promise 类型数据");
			}
			//这里是函数式更新 第一个箭头函数的返回值才是retry
			setRetry(() => () => {
				if (runConfig?.retry) {
					run(runConfig?.retry(), runConfig);
				}
			});

			safeDispatch({ stat: Stat.LOADING });

			return promise
				.then(data => {
					setData(data);
					return data;
				})
				.catch(error => {
					setError(error);
					if (config.throwOnError) {
						return Promise.reject(error);
					}

					return error;
				});
		},
		[config.throwOnError, safeDispatch, setData, setError]
	);

	return {
		isIdel: state.stat === Stat.IDEL,
		isSuccess: state.stat === Stat.SUCCESS,
		isError: state.stat === Stat.ERROR,
		isLoading: state.stat === Stat.LOADING,
		run,
		setData,
		setError,
		//retry 被调用时重新 执行run 让state刷新
		retry,
		...state
	};
};
