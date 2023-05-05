import * as React from "react";
import { Button, message, Popconfirm, Space, Switch, Table, Tag } from "antd";

import styled from "styled-components";
import "./index.less";
import { ColumnsType } from "antd/lib/table";
import { EditAddModal } from "./components/EditAddModal";
import { Exam, ModalProps, Subject, SubjectMap } from "@/typings";
import SearchOption from "./components/SearchOption";
import { useUrlNamehParams } from "@/utils/hooks/useUrlNameParams";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStudent } from "@/utils/hooks/student";
import { useCoach } from "@/utils/hooks/coach";
import { useExam } from "@/utils/hooks/exam";
import { fetchAdddRecordList } from "@/api/modules/record";
import { fetchDeleteExamList } from "@/api/modules/exam";
/* 
	考试安排
	面向：学员(复数) 负责教练（可用才行） 只有处于正在学习和学习暂停的学员可以进行考试
	考试科目
	考试时间
	考试费用
	考试地点
	安排完后根据设置的学员数量增加考试记录
	是否通过随机设置
*/
export default function Plan() {
	const [param, setParam] = useUrlNamehParams();
	const { data: examList, retry } = useExam(param);
	const editChangeRef = React.useRef<ModalProps>(null);
	const confirm = (exam: Exam) => async () => {
		const res = await fetchDeleteExamList(exam.exam_id);
		if (res.code === 200 || res.desc === "success") {
			message.success("删除成功");
		} else {
			message.error("删除失败");
		}
		retry();
	};
	const handleEdit = (exam: Exam) => () => {
		console.log("exam===", exam);
		editChangeRef.current?.showModal(exam);
	};
	const handleAdd = () => {
		editChangeRef.current?.showModal();
	};
	const { stuMap } = useStudent();
	const { coachMap } = useCoach();
	const handleStartExam = (record: Exam) => (start: boolean) => {
		if (start) {
			//模拟考试 过程1s钟
			let timer: any = null;
			const p = new Promise<boolean>(resolve => {
				timer = setTimeout(() => {
					resolve(Math.random() < 0.5);
				}, 1000);
			});
			p.then(async (pass: boolean) => {
				//发送添加考试记录的请求
				message.info(`考试结束，${coachMap[record.coach_id]}带领的学员均${pass ? "" : "未"}通过考试`);
				clearTimeout(timer);
				await fetchAdddRecordList({ ...record, pass });
			});
		}
	};
	const columns: ColumnsType<Exam> = [
		{
			title: "负责教练",
			dataIndex: "coach_id",
			key: "coach_id",
			render: (value: number) => {
				return <>{coachMap[value]}</>;
			}
		},
		{
			title: "学员",
			dataIndex: "studentArr",
			key: "studentArr",
			render: (value: string[]) => {
				const res = value.map((item, index) => (
					<Tag color={index % 2 === 0 ? "cyan" : "blue"} key={item}>
						{stuMap[item]}
					</Tag>
				));
				return <div>{res}</div>;
			}
		},

		{
			title: "科目",
			dataIndex: "subject",
			key: "subject",
			render: (value: Subject) => {
				return <>{SubjectMap[value].label}</>;
			}
		},
		{
			title: "考试时间",
			dataIndex: "start_date",
			key: "start_date"
		},
		{
			title: "费用",
			dataIndex: "cost",
			key: "cost",
			render: (value: number) => {
				return <div>{value + "元"}</div>;
			}
		},
		{
			title: "地点",
			dataIndex: "place",
			key: "place"
		},
		{
			title: "操作",
			key: "action",
			render: (value: Exam) => {
				return (
					<Space size="middle">
						<Button onClick={handleEdit(value)} icon={<EditOutlined />} size="small" type="primary">
							编辑
						</Button>
						<Popconfirm title={`确定要删除当前记录吗`} onConfirm={confirm(value)} okText="确定" cancelText="取消">
							<Button icon={<DeleteOutlined />} size="small" danger type="primary">
								删除
							</Button>
						</Popconfirm>
						<Switch checkedChildren="开始" unCheckedChildren="结束" defaultChecked={false} onChange={handleStartExam(value)} />
					</Space>
				);
			}
		}
	];

	return (
		<PlanWrapper>
			<div className="card content-box">
				<SearchOption param={param} handleAdd={handleAdd} setParam={setParam}></SearchOption>
				<Table columns={columns} dataSource={examList || []} />
			</div>
			<EditAddModal retry={retry} innerRef={editChangeRef} />
		</PlanWrapper>
	);
}

const PlanWrapper = styled.div``;
