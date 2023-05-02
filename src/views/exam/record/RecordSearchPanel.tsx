import { Input, Select, Space } from "antd";
import React from "react";
import styled from "styled-components";
export type SearchParam = {
	pass: boolean | undefined;
	name?: string;
};
interface RecordSearchPanelProps {
	param: SearchParam;
	setParam: (param: SearchParam) => void;
}
export default function RecordSearchPanel(props: RecordSearchPanelProps) {
	const { param, setParam } = props;
	console.log(param);
	const handleChange = (value: boolean | undefined) => {
		console.log(value);
		setParam({ ...param, pass: value });
	};

	return (
		<Wrapper>
			<Space>
				<Input
					value={param.name}
					onChange={event => setParam({ ...param, name: event.target.value })}
					placeholder="请输入学员姓名"
					style={{ width: 200 }}
				></Input>
				<Select
					placeholder="是否通过"
					style={{ width: 105 }}
					onChange={handleChange}
					value={param.pass}
					options={[
						{
							value: true,
							label: "通过"
						},
						{
							value: false,
							label: "未通过"
						}
					]}
				></Select>
			</Space>
		</Wrapper>
	);
}
const Wrapper = styled.div`
	display: flex;
	margin-bottom: 25px;
`;
