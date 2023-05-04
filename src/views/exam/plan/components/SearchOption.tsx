import * as React from "react";
import { SearchPanel } from "@/components/searchpanel";
import { Exam, SearchNameKey } from "@/typings";
import { useUrlNamehParams } from "@/utils/hooks/useUrlNameParams";

import styled from "styled-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface SearchOptionProps {
	param: SearchNameKey;
	setParam: (param: SearchNameKey) => void;
	placeholder?: string;
	handleAdd: () => void;
}
export default function SearchOption(props: SearchOptionProps) {
	const { param, setParam, handleAdd } = props;
	return (
		<SearchOptionWrapper>
			<Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
				新增
			</Button>
			<SearchPanel param={param} setParam={setParam}></SearchPanel>
		</SearchOptionWrapper>
	);
}
const SearchOptionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;
