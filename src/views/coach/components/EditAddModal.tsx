import * as React from "react";
import { useImperativeHandle, Ref } from "react";
import { message, Form, Input, DatePicker, Select, Drawer, Button } from "antd";
import { DateFomat, ModalProps } from "@/typings";

import { useAsync } from "@/hooks/useAsync";
import { Coach, CoachStatus, CoachStatusMap } from "@/typings/coach";
import { fetchAddCoach, updateCoachInfo } from "@/api/modules/coach";
import moment from "moment";

interface EditAddModalProps {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}

const EditAddModal = (props: EditAddModalProps) => {
	const [isEdit, setIsEdit] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { run: mutateCoach } = useAsync<Coach | undefined>();
	const [form] = Form.useForm<Coach>();
	const { retry } = props;
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (coach?: Coach) => {
		setIsEdit(coach ? true : false);
		form.resetFields();
		if (coach) {
			form.setFieldsValue({ ...coach, hire_date: moment(coach.hire_date) });
		}
		setModalVisible(true);
	};

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			values.hire_date = values.hire_date.format(DateFomat);
			await mutateCoach(isEdit ? updateCoachInfo(values) : fetchAddCoach(values));
			retry();
			setModalVisible(false);
			message.success("修改用户信息成功");
		} catch (errorInfo) {
			message.warn("修改用户信息失败");
			console.log("Failed:", errorInfo);
		}
	};
	return (
		<Drawer title="教练信息" visible={modalVisible} onClose={() => setModalVisible(false)} destroyOnClose={true}>
			<Form
				labelCol={{
					sm: { span: 8 }
				}}
				wrapperCol={{
					sm: { span: 24 }
				}}
				form={form}
			>
				<Form.Item name="coach_id" />
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
				<Form.Item label="教练入职日期" name="hire_date" rules={[{ required: true }]}>
					<DatePicker />
				</Form.Item>
				<Form.Item label="教练状态" name="status" rules={[{ required: true, message: "请选择教练状态" }]}>
					<Select
						options={[
							{ value: CoachStatus.AVAILABLE, label: CoachStatusMap[CoachStatus.AVAILABLE] },
							{ value: CoachStatus.UNAVAILABLE, label: CoachStatusMap[CoachStatus.UNAVAILABLE] }
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
