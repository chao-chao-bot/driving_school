import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 教练管理
const CourseRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "课程管理"
		},
		children: [
			{
				path: "/course/arrange",
				element: lazyLoad(React.lazy(() => import("@/views/course/arrange"))),
				meta: {
					requiresAuth: true,
					title: "课程安排",
					key: "courseList"
				}
			}
		]
	}
];

export default CourseRouter;
