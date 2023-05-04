import { Subject } from "..";

export type Exam = {
	exam_id: number;
	studentArr: number[];
	coach_id: number;
	subject: Subject;
	start_date: any;
	cost: number;
	place: string;
	pass: boolean;
};
