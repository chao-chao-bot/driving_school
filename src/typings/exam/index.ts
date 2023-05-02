import { Subject } from "..";

export type Exam = {
	exam_id: string;
	studentArr: string[];
	coach_id: string;
	subject: Subject;
	start_date: any;
	cost: number;
	place: string;
	pass: boolean;
};
