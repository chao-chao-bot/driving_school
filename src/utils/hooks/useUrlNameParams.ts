import { useUrlQueryParam } from "@/hooks/useUrlQueryParam";
import * as React from "react";
export const useUrlNamehParams = () => {
	const [keys] = React.useState(["name"]);
	const [param, setParam] = useUrlQueryParam(keys);
	const memoParam = React.useMemo(() => {
		return { ...param };
	}, [param]);

	return [memoParam, setParam] as const;
};
