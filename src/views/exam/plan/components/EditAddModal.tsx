import * as React from "react";
import { DatePicker, Form, Input, InputNumber, message, Modal } from "antd";
import styled from "styled-components";
import { DateFomat, Exam, ModalProps } from "@/typings";
import { Ref, useImperativeHandle } from "react";
import StudentSelect from "@/components/studentSelect";
import SubjectSelect from "@/components/subjectSelect";
import CoachSelect from "@/components/coachSelect";
import { useAsync } from "@/hooks/useAsync";
import { fetchAddExamList, fetchUpdateExamList } from "@/api/modules/exam";
import moment from "moment";
interface EditAddModalProps {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}

export const EditAddModal = function (props: EditAddModalProps) {
	const [form] = Form.useForm<Exam>();
	const { retry, innerRef } = props;
	const [isEdit, setIsEdit] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { run: mutateExam } = useAsync<Exam | undefined>();

	useImperativeHandle(innerRef, () => ({
		showModal
	}));
	const showModal = (exam?: Exam) => {
		setIsEdit(exam ? true : false);
		form.resetFields();
		if (exam) {
			form.setFieldsValue({ ...exam, start_date: moment(exam.start_date) });
		}
		setModalVisible(true);
	};
	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			values.start_date = values.start_date?.format(DateFomat);
			await mutateExam(isEdit ? fetchUpdateExamList(values) : fetchAddExamList(values));
			retry();
			setModalVisible(false);
			message.success("修改用户信息成功");
		} catch (errorInfo) {
			message.warn("修改用户信息失败");
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<EditAddModalWrapper>
			<Modal
				visible={modalVisible}
				onOk={handleOk}
				onCancel={() => {
					setModalVisible(false);
				}}
				title="考试安排"
			>
				<Form
					form={form}
					labelCol={{
						sm: { span: 4 }
					}}
				>
					<Form.Item name="exam_id" hidden={true}></Form.Item>
					<Form.Item label="负责教练" name="coach_id" rules={[{ required: true, message: "请选择教练" }]}>
						<CoachSelect placeholder="请选择教练"></CoachSelect>
					</Form.Item>
					<Form.Item label="学员" name="studentArr" rules={[{ required: true, message: "请选择学员" }]}>
						<StudentSelect maxTagCount={3} placeholder="请选择学员" allowClear={true} mode="multiple"></StudentSelect>
					</Form.Item>
					<Form.Item label="科目" name="subject" rules={[{ required: true, message: "请选择科目" }]}>
						<SubjectSelect placeholder="请选择科目"></SubjectSelect>
					</Form.Item>
					<Form.Item name="start_date" label="考试时间" rules={[{ required: true, message: "请选择考试时间" }]}>
						<DatePicker></DatePicker>
					</Form.Item>
					<Form.Item name="cost" label="费用" rules={[{ required: true, message: "请输入考试费用" }]}>
						<InputNumber prefix="￥" />
					</Form.Item>
					<Form.Item label="场地" name="place">
						<Input.TextArea rows={6} placeholder="请输入考试场地" />
					</Form.Item>
				</Form>
			</Modal>
		</EditAddModalWrapper>
	);
};

const EditAddModalWrapper = styled.div``;
