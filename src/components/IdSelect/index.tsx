import { Raw } from "@/typings";
import { Select, SelectProps } from "antd";
import * as React from "react";

// type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, "value" | "options" | "defaultOptionName"> {
	value?: Raw | undefined | null;
	defaultOptionName?: string;
	options?: { name: string; id: number; disabled?: boolean }[];
}

/**
 *
 *  @param props
 *  value 可以传入多种类型的值
 *  onChange 只会回调 number | nudefinded类型
 *  当isNaN(Number(value)) 为true的时候，代表选择默认类型
 *  代表选择默认类型的时候，onChange只回调 undefined
 * @returns
 */
export const IdSelect: React.FC<IdSelectProps> = props => {
	const { value, defaultOptionName, options, ...resetProps } = props;
	return (
		<Select value={options?.length ? value : 0} {...resetProps}>
			{defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
			{options?.map(option => (
				<Select.Option key={option.id} disabled={option.disabled} value={option.id}>
					{option.name}
				</Select.Option>
			))}
		</Select>
	);
};
