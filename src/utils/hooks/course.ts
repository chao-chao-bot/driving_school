import * as React from "react";
import { useAsync } from "@/hooks/useAsync";
import { cleanObject } from "../util";

import { fetchCourseList } from "@/api/modules/course";
import { Course } from "@/typings/course";

export const useCourse = (param?: Partial<Course>) => {
	const { run, ...result } = useAsync<Course[]>();
	const fetchCourse = React.useCallback(() => fetchCourseList(cleanObject(param || {})), [param]);

	React.useEffect(() => {
		run(fetchCourse(), {
			retry: fetchCourse
		});
	}, [fetchCourse, run, param]);
	return result;
};
