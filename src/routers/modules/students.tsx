import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 学员管理
const studentRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "学员管理"
		},
		children: [
			{
				path: "/student/list",
				element: lazyLoad(React.lazy(() => import("@/views/stundent/list"))),
				meta: {
					requiresAuth: true,
					title: "学员列表",
					key: "studnetList"
				}
			}
		]
	}
];

export default studentRouter;
