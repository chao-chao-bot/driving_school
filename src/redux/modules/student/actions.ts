import * as types from "@/redux/mutation-types";
import { Student } from "@/typings/students";
//设置学生列表
export const setStudentList = (studentList: Student[]) => {
	return {
		type: types.SET_STUDENT_LIST,
		studentList
	};
};
//更新学生列表
export const updateStudentList = (studentList: Student[]) => ({ type: types.SET_STUDENT_LIST, studentList });
