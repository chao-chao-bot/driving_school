import { Subject } from "..";

export type ExamRecord = {
	record_id: number;
	student_id: number;
	coach_id: number;
	subject: Subject;
	start_date: any;
	pass: boolean;
};
