import * as React from "react";
import { useAsync } from "@/hooks/useAsync";
import { Student } from "@/typings/students";
import { fetchStudentList } from "@/api/modules/student";
import { cleanObject } from "../util";

export const useStudent = (param?: Partial<Student>) => {
	const { run, data, ...result } = useAsync<Student[]>();
	const fetchStudent = React.useCallback(() => fetchStudentList(cleanObject(param || {})), [param]);
	const stuMap: Record<string, string> = React.useMemo(() => {
		const map: Record<string, string> = {};
		data?.forEach(item => {
			map[item.student_id] = item.name;
		});
		return map;
	}, [data]);

	React.useEffect(() => {
		run(fetchStudent(), {
			retry: fetchStudent
		});
	}, [fetchStudent, run, param]);
	return { data, stuMap, ...result };
};
