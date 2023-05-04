import { CoachStatus } from "@/typings";
import { useCoach } from "@/utils/hooks/coach";
import React from "react";
import { IdSelect } from "../IdSelect";
type CoachSelectProps = React.ComponentProps<typeof IdSelect>;
export default function CoachSelect(props: CoachSelectProps) {
	const { data, isLoading } = useCoach();
	const options = React.useMemo(
		() => data?.map(item => ({ name: item.name, id: item.coach_id, disabled: item.status === CoachStatus.UNAVAILABLE })),
		[data]
	);
	return <IdSelect loading={isLoading} options={options || []} {...props}></IdSelect>;
}
