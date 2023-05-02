import * as React from "react";
import { useAsync } from "@/hooks/useAsync";
import { cleanObject } from "../util";
import { Coach } from "@/typings";
import { fetchCoachList } from "@/api/modules/coach";

export const useCoach = (param?: Partial<Coach>) => {
	const { run, data, ...result } = useAsync<Coach[]>();
	const fetchStudent = React.useCallback(() => fetchCoachList(cleanObject(param || {})), [param]);
	const coachMap = React.useMemo(() => {
		const map: Record<string, string> = {};
		data?.forEach(item => {
			map[item.coach_id] = item.name;
		});
		return map;
	}, [data]);

	React.useEffect(() => {
		run(fetchStudent(), {
			retry: fetchStudent
		});
	}, [fetchStudent, run, param]);
	return { data, coachMap, ...result };
};
