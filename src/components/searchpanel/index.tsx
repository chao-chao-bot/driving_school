import * as React from "react";
import { Input } from "antd";
import { SearchNameKey } from "@/typings";

interface SearchPanelProps {
	param: SearchNameKey;
	setParam: (param: SearchNameKey) => void;
	placeholder?: string;
}
export const SearchPanel = (props: SearchPanelProps) => {
	const { param, setParam, placeholder } = props;
	const [searchValue, setSearchValue] = React.useState<SearchNameKey>();
	return (
		<Input.Search
			placeholder={placeholder ? placeholder : "请输入姓名"}
			style={{ width: 200 }}
			value={searchValue?.name}
			onChange={e => setSearchValue({ ...param, name: e.target.value })}
			onSearch={value => setParam({ ...param, name: value })}
		/>
	);
};
