import React from "react";
import "./index.less";
import { Table, Button, Space, Tag, Input } from "antd";
import { Student } from "@/typings/students";
import { ColumnsType } from "antd/lib/table";
import { ModalProps, Status, StatusMap } from "@/typings";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import EditAddModal from "./components/EditAddModal";
import DeleteModal from "./components/DeleteModal";
import { connect } from "react-redux";
import { setStudentList } from "@/redux/modules/student/actions";
import { Row } from "@/components/lib";
import { useStudent } from "@/utils/hooks/student";

import { SearchPanel } from "@/components/searchpanel";
import { useUrlNamehParams } from "@/utils/hooks/useUrlNameParams";

const StudentList = (props: any) => {
	const { studentList, setStudentList } = props;
	console.log(studentList);

	const [param, setParam] = useUrlNamehParams();
	const { data: stuList, isLoading, retry } = useStudent(param);
	React.useEffect(() => {
		setStudentList(stuList);
	}, [setStudentList, stuList]);
	const editChangeRef = React.useRef<ModalProps>(null);
	const deleteRef = React.useRef<ModalProps>(null);
	const columns: ColumnsType<Student> = [
		{
			title: "姓名",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "联系电话",
			dataIndex: "phone_number",
			key: "phone_number"
		},
		{
			title: "邮箱",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "住址",
			dataIndex: "address",
			key: "address"
		},
		{
			title: "报名时间",
			dataIndex: "start_date",
			key: "start_date"
		},
		{
			title: "截止时间",
			dataIndex: "end_date",
			key: "end_date"
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (value: Status) => {
				return (
					<Tag color={value === Status.FINSH ? "green" : value === Status.PAUSE ? "red" : "#2db7f5"}>{StatusMap[value]}</Tag>
				);
			}
		},
		{
			title: "操作",
			key: "action",
			render: (_: any, record) => {
				return (
					<Space size="middle">
						<Button icon={<EditOutlined />} size="small" type="link" onClick={handleEdit(record)}>
							编辑
						</Button>
						<Button icon={<DeleteOutlined />} size="small" type="text" danger onClick={handleDelete(record)}>
							删除
						</Button>
					</Space>
				);
			}
		}
	];
	const handleEdit = (stu: Student) => () => {
		editChangeRef.current?.showModal(stu);
	};
	const handleDelete = (value: Student) => () => {
		deleteRef.current?.showModal(value);
	};

	const handleAdd = () => {
		editChangeRef.current?.showModal();
	};
	return (
		<div>
			<div className="card content-box">
				<div className="auth">
					<Row between={true}>
						<SearchPanel param={param} setParam={setParam} />
						<Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
							新增
						</Button>
					</Row>
				</div>
				<Table loading={isLoading} rowKey={"student_id"} bordered={true} dataSource={stuList || []} columns={columns} />
			</div>
			<EditAddModal retry={retry} innerRef={editChangeRef}></EditAddModal>
			<DeleteModal retry={retry} innerRef={deleteRef}></DeleteModal>
		</div>
	);
};

const mapStateToProps = (state: any) => state.student;
const mapDispatchToProps = { setStudentList };
export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
