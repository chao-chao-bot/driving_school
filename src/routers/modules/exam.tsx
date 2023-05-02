import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 考试管理
const ExamRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "课程管理"
		},
		children: [
			{
				path: "/exam/plan",
				element: lazyLoad(React.lazy(() => import("@/views/exam/plan"))),
				meta: {
					requiresAuth: true,
					title: "考试安排",
					key: "examPlan"
				}
			},
			{
				path: "/exam/sign",
				element: lazyLoad(React.lazy(() => import("@/views/exam/sign"))),
				meta: {
					requiresAuth: true,
					title: "考试报名",
					key: "examSign"
				}
			},
			{
				path: "/exam/record",
				element: lazyLoad(React.lazy(() => import("@/views/exam/record"))),
				meta: {
					requiresAuth: true,
					title: "考试记录",
					key: "studnetRecord"
				}
			}
		]
	}
];

export default ExamRouter;
