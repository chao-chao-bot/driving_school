import { Student, Subject } from "..";

export type Course = {
	course_id: number;
	subject: Subject;
	coach_id: number;
	studentArr: Student[];
	palce: string;
};
