import { Status } from "@/typings";
import { useStudent } from "@/utils/hooks/student";
import React from "react";
import { IdSelect } from "../IdSelect";
type SubjectSelectProps = React.ComponentProps<typeof IdSelect>;
export default function StudentSelect(props: SubjectSelectProps) {
	const { data } = useStudent();

	const options = React.useMemo(
		() =>
			data?.map(item => ({
				name: item.name,
				id: item.student_id,
				disabled: item.status === Status.FINSH || item.status === Status.PAUSE
			})),
		[data]
	);
	console.log("options===", options);

	return <IdSelect options={options || []} {...props}></IdSelect>;
}
