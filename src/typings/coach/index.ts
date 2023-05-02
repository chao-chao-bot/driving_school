export enum CoachStatus {
	AVAILABLE = "available",
	UNAVAILABLE = "unavailable"
}

export const CoachStatusMap: Record<CoachStatus, string> = {
	[CoachStatus.AVAILABLE]: "空闲",
	[CoachStatus.UNAVAILABLE]: "教学中"
};
export type Coach = {
	coach_id: string;
	name: string;
	phone_number: string;
	email: string;
	hire_date: any;
	status: CoachStatus;
};
