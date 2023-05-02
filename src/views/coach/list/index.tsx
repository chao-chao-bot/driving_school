import * as React from "react";
import moment from "moment";
import { Table, Button, Space, Tag } from "antd";
import "./index.less";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { setStudentList } from "@/redux/modules/student/actions";
import { connect } from "react-redux";
import { Row } from "@/components/lib";
import { Coach, CoachStatus, CoachStatusMap } from "@/typings/coach";
import DeleteModal from "../components/DeleteModal";
import EditAddModal from "../components/EditAddModal";
import { ModalProps } from "@/typings";
import { useCoach } from "@/utils/hooks/coach";
import { SearchPanel } from "@/components/searchpanel";
import { useUrlNamehParams } from "@/utils/hooks/useUrlNameParams";
const CoachList = () => {
	const [param, setParam] = useUrlNamehParams();
	const { data: coachLsit, retry, isLoading } = useCoach(param);
	const editChangeRef = React.useRef<ModalProps>(null);
	const delelteRef = React.useRef<ModalProps>(null);
	const handleEdit = (coach: Coach) => () => {
		editChangeRef.current?.showModal(coach);
	};
	const handleAdd = () => {
		editChangeRef.current?.showModal();
	};
	const handleDelete = (coach: Coach) => () => {
		delelteRef?.current?.showModal(coach);
	};

	const columns: ColumnsType<Coach> = [
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
			title: "入职日期",
			dataIndex: "hire_date",
			key: "hire_date"
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (value: CoachStatus) => {
				return <Tag color={value === CoachStatus.UNAVAILABLE ? "orange" : "green"}>{CoachStatusMap[value]}</Tag>;
			}
		},
		{
			title: "操作",
			key: "action",
			render: (_: any, record) => {
				return (
					<Space size="middle">
						<Button onClick={handleEdit(record)} icon={<EditOutlined />} size="small" type="link">
							编辑
						</Button>
						<Button onClick={handleDelete(record)} icon={<DeleteOutlined />} size="small" type="text" danger>
							删除
						</Button>
					</Space>
				);
			}
		}
	];

	return (
		<div className="card content-box">
			<div className="auth">
				<Row between={true}>
					<SearchPanel param={param} setParam={setParam} />
					<Button onClick={handleAdd} icon={<PlusOutlined />} type="primary">
						新增
					</Button>
				</Row>
			</div>
			<Table loading={isLoading} rowKey={"coach_id"} bordered={true} dataSource={coachLsit || []} columns={columns} />
			<EditAddModal innerRef={editChangeRef} retry={retry}></EditAddModal>
			<DeleteModal innerRef={delelteRef} retry={retry} />
		</div>
	);
};

const mapStateToProps = (state: any) => state.student;
const mapDispatchToProps = { setStudentList };
export default connect(mapStateToProps, mapDispatchToProps)(CoachList);
