import * as React from "react";
import { Subject, SubjectArr, SubjectMap } from "@/typings";
import { ExamRecord } from "@/typings/record";
import { Button, message, Popconfirm, Select, Space, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { List } from "./list";
import { SearchPanel } from "@/components/searchpanel";
import { useUrlNamehParams } from "@/utils/hooks/useUrlNameParams";
import styled from "styled-components";

import { fetchDeleteRecordList } from "@/api/modules/record";
import { useExamRecord } from "./util/useExamRecord";
import { useStudent } from "@/utils/hooks/student";
import { useCoach } from "@/utils/hooks/coach";

export default function Record() {
	const [data, setData] = React.useState<ExamRecord[]>([]);

	const [param, setParam] = useUrlNamehParams();
	const { data: list, retry } = useExamRecord(param);
	const { stuMap } = useStudent();
	const { coachMap } = useCoach();
	const handleChange = (key: string) => {
		const newData = list?.filter(item => item.subject === key);
		setData(newData || []);
	};
	React.useEffect(() => {
		setData(list?.filter(item => item.subject === Subject.SUBJEC1) || []);
	}, [list]);
	const confirm = (record: ExamRecord) => async () => {
		//发送删除请求
		const res = await fetchDeleteRecordList(record);
		if (res.code === 200) {
			message.success("删除成功！");
		} else {
			message.error("删除失败！");
		}
		retry();
	};

	const columns: ColumnsType<ExamRecord> = [
		{
			title: "学员",
			dataIndex: "student_id",
			key: "student_id",
			render: (value: string) => {
				return <div>{stuMap[value]}</div>;
			}
		},
		{
			title: "教练",
			dataIndex: "coach_id",
			key: "coach_id",
			render: (value: number) => {
				return <div>{coachMap[value]}</div>;
			}
		},
		{
			title: "日期",
			dataIndex: "start_date",
			key: "start_date"
		},
		{
			title: "科目",
			dataIndex: "subject",
			key: "subject",
			render: (value: Subject, _) => {
				return <>{SubjectMap[value].label}</>;
			}
		},
		{
			title: "是否通过",
			dataIndex: "pass",
			key: "pass",
			render: (value, _) => {
				return <Tag color={value ? "green" : "red"}>{value ? "通过" : "未通过"}</Tag>;
			}
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm title={`确定要删除${record.studen_id}的记录吗`} onConfirm={confirm(record)} okText="确定" cancelText="取消">
						<Button type="primary" danger>
							删除
						</Button>
					</Popconfirm>
				</Space>
			)
		}
	];

	return (
		<div className="card content-box">
			<Tabs onChange={handleChange}>
				{SubjectArr.map(item => {
					return (
						<Tabs.TabPane tab={item.label} key={item.key}>
							<SearchWrapper>
								<SearchPanel param={param} setParam={setParam} />
							</SearchWrapper>
							<List rowKey={"record_id"} dataSource={data || []} columns={columns} />
						</Tabs.TabPane>
					);
				})}
			</Tabs>
		</div>
	);
}

const SearchWrapper = styled.div`
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
`;
