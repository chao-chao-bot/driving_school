import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Course } from "@/typings/course";

//获课程列表
export const fetchCourseList = async (param?: Partial<Course>) => {
	const res = await http.get<Course[]>(PORT1 + `/course/list`, param);
	return res?.data || [];
};
//更新课程安排
export const fetchUpdateCourseList = async (param?: Partial<Course>) => {
	const res = await http.post<Course>(PORT1 + `/course/edit`, param);
	return res.data;
};

//更新课程安排
export const fetchAddCourseList = async (param?: Partial<Course>) => {
	const res = await http.post<Course>(PORT1 + `/course/add`, param);
	return res.data;
};

//删除课程
export const fetchDeleteCourseList = async (course_id: number) => {
	const res = await http.post<Course>(PORT1 + `/course/delete`, { course_id });
	return res;
};
