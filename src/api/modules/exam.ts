import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Exam } from "@/typings";

//获考试安排列表
export const fetchExamList = async (param?: Partial<Exam>) => {
	const res = await http.get<Exam[]>(PORT1 + `/exam/list`, param);
	return res?.data || [];
};

//更新考试安排
export const fetchUpdateExamList = async (param: Partial<Exam>) => {
	const res = await http.post<Exam>(PORT1 + `/exam/update`, param);
	return res.data;
};

//更新考试安排
export const fetchAddExamList = async (param?: Partial<Exam>) => {
	const res = await http.post<Exam>(PORT1 + `/exam/add`, param);
	return res.data;
};

//删除考试
export const fetchDeleteExamList = async (Exam_id: string) => {
	const res = await http.post<Exam>(PORT1 + `/exam/delete`, { Exam_id });
	return res;
};
