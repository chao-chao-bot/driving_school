import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import "./index.less";
import { store } from "@/redux";

const LayoutHeader = () => {
	const { Header } = Layout;
	const userInfo = store.getState().global.userInfo;
	console.log(userInfo);

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Language />
				<Theme />
				<Fullscreen />
				<span className="username">{userInfo.name}</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
