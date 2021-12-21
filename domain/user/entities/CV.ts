import {randomUUID} from "crypto";
import { CVLoaded } from "../domain_events/CVLoaded.event";
import { CVStatus } from "../enums/CVStatus.enum"
import { CVAcademicFormation } from "../value_objects/CVAcademicFormation.value"
import { CVCourses } from "../value_objects/CVCourses.value"
import { CVID } from "../value_objects/CVID.value"
import { CVSkills } from "../value_objects/CVSkills.value"

type CVEvents = CVLoaded 

export class CV<S extends CVStatus>{
	private ID: CVID
	public status: S
	private eventRecorder: CVEvents[] = []
	
	private constructor(
		public academicFormation: CVAcademicFormation,
		public skills: CVSkills,
		public courses: CVCourses,
		status: S,
		id?: CVID,
	){
		this.status = status
		this.ID = id || new CVID(randomUUID())
	}

	getID(): CVID{ return this.ID }
	getEvents(): CVEvents[] { return this.eventRecorder }

	static load(
		academicFormation: CVAcademicFormation,
		skills: CVSkills,
		courses: CVCourses,
        id?: CVID
		): CV<CVStatus.Unconfirmed> {
		const cv = new CV(academicFormation,skills,courses,CVStatus.Unconfirmed, id)
		cv.eventRecorder.push(new CVLoaded(
			cv.ID,
			cv.academicFormation,
			cv.skills,
			cv.courses,
			cv.status,
		))
		return cv
	}

	protected invariants(){}

}

