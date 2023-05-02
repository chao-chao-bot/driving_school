import * as React from "react";

import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { loginApi, registerApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useMount } from "@/hooks/useMount";

const LoginForm = (props: any) => {
	const [isRegister, setisRegister] = React.useState(false);
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			const password = loginForm.password;
			const confirm_password = loginForm.confirm_password;
			if (isRegister && password !== confirm_password) {
				message.warn("两次密码输入不一致");
				return;
			}
			if (isRegister) {
				const res = await registerApi(loginForm);
				if (res.code !== 200) {
					return;
				}
			}
			setLoading(true);
			const { data } = await loginApi(loginForm);
			setToken(data?.access_token);
			setTabsList([]);
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	useMount(() => {
		form.setFieldValue("password", "123456");
		form.setFieldValue("username", "admin");
	});

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			{isRegister && (
				<Form.Item name="confirm_password" rules={[{ required: true, message: "请再次输入密码" }]}>
					<Input.Password autoComplete="new-password" placeholder="请确认密码" prefix={<LockOutlined />} />
				</Form.Item>
			)}
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{isRegister ? "注册" : "登录"}
				</Button>
			</Form.Item>
			<div style={{ display: "flex", justifyContent: " center" }}>
				<Button type="link" onClick={() => setisRegister(!isRegister)}>
					{isRegister ? "已注册，去登录" : "没有账号？去注册"}
				</Button>
			</div>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
