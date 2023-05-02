import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 教练管理
const CoachRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "教练管理"
		},
		children: [
			{
				path: "/coach/list",
				element: lazyLoad(React.lazy(() => import("@/views/coach/list"))),
				meta: {
					requiresAuth: true,
					title: "教练列表",
					key: "coachList"
				}
			}
		]
	}
];

export default CoachRouter;
