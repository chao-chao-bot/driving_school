import * as React from "react";
import moment from "moment";
import { useState, useImperativeHandle, Ref } from "react";
import { message, Form, Input, DatePicker, Select, Drawer, Button } from "antd";
import { DateFomat, ModalProps, Status, StatusMap } from "@/typings";
import "./index.less";

import { Student } from "@/typings/students";
import { useAsync } from "@/hooks/useAsync";
import { fetchAddStudent, updateSutdentInfo } from "@/api/modules/student";

interface EditAddModalProps {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}

const EditAddModal = (props: EditAddModalProps) => {
	const [isEdit, setIsEdit] = React.useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const { run: mutateStudent } = useAsync<Student | undefined>();
	const [form] = Form.useForm<Student>();
	const { retry } = props;

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (student: Student) => {
		setIsEdit(student ? true : false);
		form.resetFields();
		if (student) {
			form.setFieldsValue({ ...student, start_date: moment(student.start_date), end_date: moment(student.start_date) });
		}
		setModalVisible(true);
	};

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			values.start_date = values.start_date.format(DateFomat);
			values.end_date = values.end_date.format(DateFomat);
			await mutateStudent(isEdit ? updateSutdentInfo(values) : fetchAddStudent(values));
			retry();
			setModalVisible(false);
			message.success("修改用户信息成功");
		} catch (errorInfo) {
			message.warn("修改信息失败，请稍后");
			console.log("Failed:", errorInfo);
		}
	};
	return (
		<Drawer title="学员信息" visible={modalVisible} onClose={() => setModalVisible(false)} destroyOnClose={true}>
			<Form
				labelCol={{
					sm: { span: 6 }
				}}
				wrapperCol={{
					sm: { span: 24 }
				}}
				form={form}
			>
				<Form.Item name="student_id" hidden={true}></Form.Item>
				<Form.Item label="姓名" name="name" rules={[{ required: true, message: "姓名是必填项" }]}>
					<Input placeholder="请输入姓名" />
				</Form.Item>
				<Form.Item name="phone_number" label="联系电话" rules={[{ required: true, message: "电话是必填项" }]}>
					<Input addonBefore={<div>+86</div>} />
				</Form.Item>
				<Form.Item
					label="邮箱"
					name="email"
					rules={[
						{
							type: "email",
							message: "请输入合法的邮箱"
						}
					]}
				>
					<Input placeholder="请输入邮箱" />
				</Form.Item>
				<Form.Item label="住址" name="address">
					<Input placeholder="请输入家庭住址" />
				</Form.Item>
				<Form.Item label="入校日期" name="start_date" rules={[{ required: true }]}>
					<DatePicker />
				</Form.Item>
				<Form.Item label="毕业日期" name="end_date" rules={[{ required: true }]}>
					<DatePicker />
				</Form.Item>
				<Form.Item label="当前教练" name="coach" rules={[{ required: true, message: "请选择教练" }]}>
					<Select
						options={[
							{ value: "jack", label: "Jack" },
							{ value: "lucy", label: "Lucy" },
							{ value: "Yiminghe", label: "yiminghe" },
							{ value: "disabled", label: "Disabled", disabled: true }
						]}
					/>
				</Form.Item>
				<Form.Item label="学习状态" name="status" rules={[{ required: true, message: "请选择学员状态" }]}>
					<Select
						options={[
							{ value: Status.READY, label: StatusMap[Status.READY] },
							{ value: Status.PAUSE, label: StatusMap[Status.PAUSE] },
							{ value: Status.FINSH, label: StatusMap[Status.FINSH] }
						]}
					/>
				</Form.Item>
			</Form>
			<div className="footer-button">
				<Button type="primary" onClick={handleSubmit}>
					提交
				</Button>
			</div>
		</Drawer>
	);
};
export default EditAddModal;
