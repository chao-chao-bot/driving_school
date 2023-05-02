import { AnyAction } from "redux";

import produce from "immer";
import * as types from "@/redux/mutation-types";
import { StudentState } from "@/redux/interface";

const studentState: StudentState = {
	studentList: []
};

const student = (state: StudentState = studentState, action: AnyAction) => {
	return produce(state, draftState => {
		switch (action.type) {
			case types.SET_STUDENT_LIST:
				draftState.studentList = action.studentList;
				break;
			case types.UPDATE_STUDENT_LIST:
				draftState.studentList = action.studentList;
				break;
			default:
				return studentState;
		}
	});
};

export default student;
