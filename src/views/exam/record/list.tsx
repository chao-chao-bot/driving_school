import * as React from "react";
import { ExamRecord } from "@/typings/record";
import { Table, TableProps } from "antd";

interface ListProps extends TableProps<ExamRecord> {
	refresh?: () => void;
}
export const List = (props: ListProps) => {
	const { refresh, ...resetProps } = props;
	return <Table {...resetProps}></Table>;
};
