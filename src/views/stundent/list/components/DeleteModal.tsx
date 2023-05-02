import * as React from "react";
import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message, Form } from "antd";
import { ModalProps } from "@/typings";

import { Student } from "@/typings/students";
import { fetchdeleteStudent } from "@/api/modules/student";

interface DeleteModal {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}

const DeleteModal = (props: DeleteModal) => {
	const { retry } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const [tips, setTips] = React.useState("");
	const studentref = React.useRef<Student>();
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (stu: Student) => {
		setModalVisible(true);
		setTips(`你确定删除 ${stu?.name} 吗？删除后该学员的其他记录也会删除`);
		studentref.current = stu;
	};

	const handleOk = async () => {
		//发送删除请求
		const stu = studentref.current;
		const res = await fetchdeleteStudent(stu?.student_id || "");
		if (res.code === 200) {
			message.success("删除成功");
		} else {
			message.success("删除失败");
		}
		retry();
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	return (
		<Modal title="学员删除" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>{tips}</p>
		</Modal>
	);
};
export default DeleteModal;
