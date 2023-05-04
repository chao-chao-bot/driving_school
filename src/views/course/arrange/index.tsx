import * as React from "react";
import { ModalProps, Subject, SubjectMap } from "@/typings";
import { Course } from "@/typings/course";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import styled from "styled-components";
import "./index.less";
import EditAddModal from "./components/EditAddModal";
import { useCourse } from "@/utils/hooks/course";
import { Row } from "@/components/lib";
import { useStudent } from "@/utils/hooks/student";
import { useCoach } from "@/utils/hooks/coach";
import { fetchDeleteCourseList } from "@/api/modules/course";
// 课程管理模块 对课程进行增删改查  面向教练和学员 教练个数为1 学员个数最多为5
// 如：新增科目1(可以增加多个重复科目1)--教练选择(教练可用才可选)--学员选择--练车场地---
//改变教练状态--改变学员状态（已经暂停->正在学习）可以考虑新增授课记录
export const CourseList = function () {
	const [coursLsit, setCoursLsit] = React.useState<Course[]>([]);

	const { data, retry, isLoading: courseLoading } = useCourse();

	React.useEffect(() => {
		setCoursLsit(data || []);
	}, [data]);

	const { isLoading: stuLoading, stuMap } = useStudent();
	const { isLoading: coachLoading, coachMap } = useCoach();
	const isLoading = courseLoading && stuLoading && coachLoading;

	const editChangeRef = React.useRef<ModalProps>(null);

	const confirm = (record: Course) => async () => {
		const res = await fetchDeleteCourseList(record.course_id);
		if (res.code === 200) {
			message.success("删除成功");
		} else {
			message.success("删除失败");
		}
		retry();
	};
	const handleEdit = (course: Course) => () => {
		editChangeRef.current?.showModal(course);
	};
	const columns: ColumnsType<Course> = [
		{
			title: "科目名称",
			dataIndex: "subject",
			key: "dataIndex",
			render: (value: Subject) => {
				return <h4>{SubjectMap[value].label}</h4>;
			}
		},
		{
			title: "教练",
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
			title: "练习场地",
			dataIndex: "place",
			key: "place"
		},
		{
			title: "操作",
			key: "action",
			render: (value: Course) => {
				console.log("value===", value);

				return (
					<Space size="middle">
						<Button onClick={handleEdit(value)} icon={<EditOutlined />} size="small" type="primary">
							编辑
						</Button>
						<Popconfirm
							title={`确定要删除 ${coachMap[value.coach_id]} 的课程记录吗`}
							onConfirm={confirm(value)}
							okText="确定"
							cancelText="取消"
						>
							<Button icon={<DeleteOutlined />} size="small" danger type="primary">
								删除
							</Button>
						</Popconfirm>
					</Space>
				);
			}
		}
	];
	const handleClick = () => {
		editChangeRef.current?.showModal();
	};

	return (
		<div className="card content-box">
			<Wrapper>
				<div className="searchpanel">
					<Row between={true}>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleClick}>
							新建课程
						</Button>
					</Row>
				</div>
				<Table loading={isLoading} columns={columns} rowKey={"course_id"} dataSource={coursLsit || []} />
				<EditAddModal retry={retry} innerRef={editChangeRef}></EditAddModal>
			</Wrapper>
		</div>
	);
};
export default CourseList;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	.searchpanel {
		margin-bottom: 20px;
	}
`;
