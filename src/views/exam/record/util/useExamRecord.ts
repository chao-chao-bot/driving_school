import * as React from "react";
import { useAsync } from "@/hooks/useAsync";
import { ExamRecord } from "@/typings/record";
import { fetchRecordList } from "@/api/modules/record";
import { cleanObject } from "@/utils/util";

export const useExamRecord = (param?: Partial<ExamRecord>) => {
	const { run, ...result } = useAsync<ExamRecord[]>();
	const fetchRecord = React.useCallback(() => fetchRecordList(cleanObject(param || {})), [param]);
	React.useEffect(() => {
		run(fetchRecord(), {
			retry: fetchRecord
		});
	}, [fetchRecord, run]);

	return result;
};
