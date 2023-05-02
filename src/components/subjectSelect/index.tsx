import { SubjectArr } from "@/typings";
import React from "react";
import { KeySelect } from "../keySelect";
type SubjectSelectProps = React.ComponentProps<typeof KeySelect>;
export default function SubjectSelect(props: SubjectSelectProps) {
	return <KeySelect options={SubjectArr || []} {...props}></KeySelect>;
}
