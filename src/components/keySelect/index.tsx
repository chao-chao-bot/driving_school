import { Raw } from "@/typings";
import { Select, SelectProps } from "antd";

interface KeySelectProps extends Omit<SelectProps, "value" | "options" | "defaultOptionName"> {
	value?: Raw | undefined | null;
	options?: { label: string; key: string | number }[];
}
export const KeySelect = (props: KeySelectProps) => {
	const { value, options, ...resetProps } = props;
	return (
		<Select value={options?.length ? value : "0"} {...resetProps}>
			{options?.map(option => (
				<Select.Option key={option.key} value={option.key}>
					{option.label}
				</Select.Option>
			))}
		</Select>
	);
};
