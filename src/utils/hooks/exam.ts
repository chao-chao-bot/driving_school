import * as React from "react";
import { useAsync } from "@/hooks/useAsync";
import { cleanObject } from "../util";

import { Exam } from "@/typings";
import { fetchExamList } from "@/api/modules/exam";

export const useExam = (param?: Partial<Exam>) => {
	const { run, ...result } = useAsync<Exam[]>();
	const fetchExam = React.useCallback(() => fetchExamList(cleanObject(param || {})), [param]);

	React.useEffect(() => {
		run(fetchExam(), {
			retry: fetchExam
		});
	}, [fetchExam, run, param]);
	return result;
};
