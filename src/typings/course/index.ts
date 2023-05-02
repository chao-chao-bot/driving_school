import { Coach, Student, Subject } from "..";

export type Course = {
	course_id: string;
	subject: Subject;
	coach_id: string;
	studentArr: Student[];
	palce: string;
};
