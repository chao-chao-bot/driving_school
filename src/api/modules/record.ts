import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { ExamRecord } from "@/typings/record";
import { Exam } from "@/typings";

//获取考试记录
export const fetchRecordList = async (param?: Partial<ExamRecord>) => {
	const res = await http.get<ExamRecord[]>(PORT1 + `/record/list`, param);
	return res?.data || [];
};
//删除考试记录
export const fetchDeleteRecordList = async (param?: Partial<ExamRecord>) => {
	const res = await http.post(PORT1 + `/record/delete`, param);
	return res;
};
//增加考试记录
export const fetchAdddRecordList = async (param?: Partial<Exam>) => {
	console.log("param====", param);

	const res = await http.post(PORT1 + `/record/add`, param);
	return res;
};
