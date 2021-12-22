import {randomUUID} from "crypto";
import { CVStatus } from "../enums/CVStatus.enum";
import  CVAcademicFormation  from "../value_objects/CVAcademicFormation.value";
import { CVLoaded } from "../domain_events/CVLoaded.event";
import CVCourses from "../value_objects/CVCourses.value";
import CVID from "../value_objects/CVID.value";
import CVSkills from "../value_objects/CVSkills.value";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";
import { CVUpdated } from "../domain_events/CVUpdated.event";
import CVNotification from "./CVNotification.entity";

type CVEvents = CVLoaded | CVUpdated
export class CV<S extends CVStatus>{
	public status: S
	private eventRecorder: CVEvents[] = []
	
	constructor(
		public academicFormation: CVAcademicFormation[],
		public skills: CVSkills[],
		public courses: CVCourses[],
		status: S,
		private ID: CVID,
	){
		this.status = status;
	}

	public getID(): CVID{ return this.ID }
	public getEvents(){ return this.eventRecorder }

	update(
		ID: CVID,
		skills: CVSkills[],
		courses: CVCourses[],
		academicFormation: CVAcademicFormation[],
	){
		this.ID = ID
		this.skills = skills
		this.courses = courses
		this.academicFormation = academicFormation
		this.eventRecorder.push(new CVUpdated(
			this.ID,
			this.skills,
			this.courses,
			this.academicFormation
		))
	}

	static load(
		academicFormation: CVAcademicFormation[],
		skills: CVSkills[],
		courses: CVCourses[],
        ID: CVID,
		): CV<CVStatus.Unconfirmed> {
		const cv = new CV(academicFormation,skills,courses,CVStatus.Unconfirmed, ID)
		cv.eventRecorder.push(new CVLoaded(
			cv.ID,
			cv.academicFormation,
			cv.skills,
			cv.courses,
			cv.status,
		));
		const subject = new NotificationSubject('CV Cargado');
		const content = new NotificationContent('El curriculum se ha subido');
		const cvNotification = new CVNotification(subject, content, cv).loadedNotification();
		
		return cv
	}


	protected invariants(){}

}

