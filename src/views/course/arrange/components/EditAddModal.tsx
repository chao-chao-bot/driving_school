import { Course } from "@/typings/course";
import { Form, Select, Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ModalProps } from "@/typings";
import React, { Ref, useImperativeHandle } from "react";
import styled from "styled-components";
import SubjectSelect from "@/components/subjectSelect";
import StudentSelect from "@/components/studentSelect";
import CoachSelect from "@/components/coachSelect";
import { useAsync } from "@/hooks/useAsync";
import { fetchAddCourseList, fetchUpdateCourseList } from "@/api/modules/course";

interface EditAddModalProps {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}
export default function EditAddModal(props: EditAddModalProps) {
	const { innerRef, retry } = props;
	const [isEdit, setIsEdit] = React.useState(false);
	const { run: mutateCoach } = useAsync<Course | undefined>();
	const [modalVisible, setModalVisible] = React.useState(false);
	const [form] = Form.useForm<Course>();
	const showModal = (course: Course) => {
		setIsEdit(course ? true : false);
		form.resetFields();
		if (course) {
			form.setFieldsValue(course);
		}
		setModalVisible(true);
	};
	useImperativeHandle(innerRef, () => ({
		showModal
	}));
	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			await mutateCoach(isEdit ? fetchUpdateCourseList(values) : fetchAddCourseList(values));
			retry();
			setModalVisible(false);
			message.success("修改用户信息成功");
		} catch (errorInfo) {
			message.warn("修改用户信息失败");
			console.log("Failed:", errorInfo);
		}
	};
	return (
		<Wrapper>
			<Modal
				cancelText="取消"
				okText="确认"
				maskClosable={false}
				title="课程信息"
				onOk={handleSubmit}
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
			>
				<Form
					form={form}
					labelCol={{
						sm: { span: 5 }
					}}
				>
					<Form.Item name={"course_id"} hidden={true}></Form.Item>
					<Form.Item label="科目" name="subject" rules={[{ required: true, message: "请选择科目" }]}>
						<SubjectSelect placeholder="请选择科目"></SubjectSelect>
					</Form.Item>
					<Form.Item label="教练" name="coach_id" rules={[{ required: true, message: "请选择教练" }]}>
						<CoachSelect placeholder="请选择教练"></CoachSelect>
					</Form.Item>
					<Form.Item label="学员" name="studentArr" rules={[{ required: true, message: "请选择学员" }]}>
						<StudentSelect maxTagCount={3} placeholder="请选择学员" allowClear={true} mode="multiple"></StudentSelect>
					</Form.Item>
					<Form.Item label="练习场地" name="place">
						<Input.TextArea rows={6} placeholder="请选择科目" />
					</Form.Item>
				</Form>
			</Modal>
		</Wrapper>
	);
}

const Wrapper = styled.div``;
