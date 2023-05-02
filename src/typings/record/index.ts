import { Subject } from "..";

export type ExamRecord = {
	record_id: string;
	studen_id: string;
	coach_id: string;
	subject: Subject;
	start_date: any;
	pass: boolean;
};
