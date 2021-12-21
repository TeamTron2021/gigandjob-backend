import {randomUUID} from "crypto";
import { CVStatus } from "../enums/CVStatus.enum";
import  CVAcademicFormation  from "../value_objects/CV/CVAcademicFormation.value";
import CVNotification from "./CVNotification";
import { CVLoaded } from "../domain_events/CV/CVLoaded.event";
import CVCourses from "../value_objects/CV/CVCourses.value";
import CVID from "../value_objects/CV/CVID.value";
import CVSkills from "../value_objects/CV/CVSkills.value";
import NotificationContent from "../value_objects/CV/NotificationContent.value";
import NotificationSubject from "../value_objects/CV/NotificationSubject.value";

type CVEvents = CVLoaded 
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

