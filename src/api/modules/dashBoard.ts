import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Coach } from "@/typings/coach";
import { Board } from "@/typings/dashBoard";

// 获取所有考试次数
export const updateCoachInfo = async () => {
	const res = await http.post<Coach>(PORT1 + "form/exam/sum");
	return res.data;
};

//获取所有考试通过次数
export const fetchExamPassSum = async () => {
	const res = await http.post(PORT1 + "/exam/pass/sum");
	return res.data;
};
//获取所有没通过次数
export const fetchExamFailSum = async () => {
	const res = await http.get(PORT1 + `/exam/fail/sum`);
	return res?.data || [];
};

//获取教练数
export const fetchCoachSum = async () => {
	const res = await http.get<Board>(PORT1 + `/coach/sum`);
	return res.data;
};
//获取学员数
export const fetchStudentSum = async (coach_id: string) => {
	const res = await http.get(PORT1 + `/student/sum`, { coach_id });
	return res;
};
