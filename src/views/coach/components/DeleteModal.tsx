import * as React from "react";
import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message, Form } from "antd";
import { Coach, ModalProps } from "@/typings";
import { fetchdeleteCoach } from "@/api/modules/coach";

interface DeleteModal {
	innerRef: Ref<ModalProps>;
	retry: () => void;
}

const DeleteModal = (props: DeleteModal) => {
	const { retry } = props;
	const [tips, setTips] = React.useState("");
	const coachdentref = React.useRef<Coach>();
	const [modalVisible, setModalVisible] = useState(false);
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (coach: Coach) => {
		setModalVisible(true);
		setTips(`你确定删除 ${coach.name} 吗？删除后该学员的其他记录也会删除`);
		coachdentref.current = coach;
	};

	const handleOk = async () => {
		//发送删除请求
		const coach = coachdentref.current;
		const res = await fetchdeleteCoach(coach?.coach_id || "");
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
		<Modal title="教练删除" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>{tips}</p>
		</Modal>
	);
};
export default DeleteModal;
