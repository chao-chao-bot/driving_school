import { MapOption, Status } from "..";
import { map } from "lodash-es";

export type Student = {
	student_id: string;
	name: string;
	address: string;
	phone_number: string;
	email: string;
	start_date: any;
	end_date: any;
	status: Status;
};

export enum Subject {
	SUBJEC1 = "subject_1",
	SUBJEC2 = "subject_2",
	SUBJEC3 = "subject_3",
	SUBJEC4 = "subject_4"
}
export const SubjectMap: Record<Subject, MapOption> = {
	[Subject.SUBJEC1]: {
		label: "科目1",
		key: Subject.SUBJEC1
	},
	[Subject.SUBJEC2]: {
		label: "科目2",
		key: Subject.SUBJEC2
	},
	[Subject.SUBJEC3]: {
		label: "科目3",
		key: Subject.SUBJEC3
	},
	[Subject.SUBJEC4]: {
		label: "科目4",
		key: Subject.SUBJEC4
	}
};

export const SubjectArr = map(SubjectMap);
