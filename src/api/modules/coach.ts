import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Coach } from "@/typings/coach";

// 更新教练信息
export const updateCoachInfo = async (param: Coach) => {
	const res = await http.post<Coach>(PORT1 + "/coach/edit", param);
	return res.data;
};
//添加教练信息
export const fetchAddCoach = async (param: Coach) => {
	const res = await http.post<Coach>(PORT1 + "/coach/add", param);
	return res.data;
};
//获取教练列
export const fetchCoachList = async (param?: Partial<Coach>) => {
	const res = await http.get<Coach[]>(PORT1 + `/coach/list`, param);
	return res?.data || [];
};
//删除教练
export const fetchdeleteCoach = async (coach_id: string) => {
	const res = await http.post(PORT1 + `/coach/delete`, { coach_id });
	return res;
};
