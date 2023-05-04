import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Student } from "@/typings/students";

//获取学生列表
export const fetchStudentList = async (param?: Partial<Student>) => {
	const res = await http.get<Student[]>(PORT1 + `/student/list`, param);
	return res.data || [];
};
// 更新学生信息
export const updateSutdentInfo = async (param: Student) => {
	const res = await http.post<Student>(PORT1 + "/student/edit", param);
	return res.data;
};
//添加学员信息
export const fetchAddStudent = async (param: Student) => {
	const res = await http.post<Student>(PORT1 + "/student/add", param);
	return res.data;
};
//删除学员信息
export const fetchdeleteStudent = async (student_id: string) => {
	const res = await http.post(PORT1 + "/student/delete", { student_id });
	return res;
};
