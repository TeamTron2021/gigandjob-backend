import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferCreated from "../domain-events/job-offer/JobOfferCreated.Event";
import JobOfferModified from "../domain-events/job-offer/JobOfferModified";
import IJobOffer from "../shared/IJobOffer";
import { OfferStatus } from "../shared/OfferStatus.enum";
import GigDuration from "../value-objects/Gig/JobOfferGigDuration";
import JobOfferDate from "../value-objects/JobOffer/JobOfferDate";
import JobOfferDescription from "../value-objects/JobOffer/JobOfferDescription";
import JobOfferId from "../value-objects/JobOffer/JobOfferId";
import JobOfferSalary from "../value-objects/JobOffer/JobOfferSalary";
import JobOfferSkill from "../value-objects/JobOffer/JobOfferSkill";
import JobOfferTItle from "../value-objects/JobOffer/JobOfferTitle";
import JobOfferVacant from "../value-objects/JobOffer/JobOfferVacant";
import { PostulationStatus } from "../value-objects/postulation/PostulationStatus";
import { JobOfferComplaint } from "./JobOfferComplaint";
import { JobOfferLike } from "./JobOfferLike";
import { Postulation } from "./postulation";
import InterviewTitle from "../value-objects/Interview/interview/InterviewTitle";
import InterviewDescription from "../value-objects/Interview/interview/InterviewDescription";
import InterviewDate from "../value-objects/Interview/interview/InterviewDate";
import InterviewInterviewed from "../value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../value-objects/Interview/interview/InterviewInterviewer";
import InterviewId from "../value-objects/Interview/interview/InterviewId";
import OnlineInterviewUrlMeeting from "../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting";
import {InterviewStatus} from "../shared/InterviewStatus.enum";
import OnlineInterview from "./OnlineInterview";
import InterviewAccepted from "../domain-events/interview/interview/InterviewAccepted.Event";
import InPersonInterviewDirection from "../value-objects/Interview/InPersonInterview/InPersonInterviewDirection";
import InPersonInterview from "./InPersonInterview";


export default class JobOffer<S extends OfferStatus> implements IJobOffer {
	private eventRecorder: IDomainEvent[] = [];
	private postulations: Postulation<PostulationStatus>[] = [];
	public status: S;
	constructor (
		public description: JobOfferDescription,
		public salary: JobOfferSalary,
		public skills: JobOfferSkill[],
		public title: JobOfferTItle,
		public vacant: JobOfferVacant,
		public likes: JobOfferLike[],
		public complaint: JobOfferComplaint[],
		public date: JobOfferDate,
		status: S,
		private Id: JobOfferId,){
		this.status =  status;
		
	}
	public getPostulations(): Postulation<PostulationStatus>[] {
		return this.postulations;
	}
	
	public addPostulation(postulation: Postulation<PostulationStatus>): void {
		this.postulations.push(postulation)
	}
	public getOfferId(){
		return this.Id;
	}
	public getEvents(){
		return this.eventRecorder;
	}
	public addEvent(domainEvent: IDomainEvent){
		this.eventRecorder.push(domainEvent);
	}
	
	static create(
		description: JobOfferDescription,
		salary: JobOfferSalary,
		skills: JobOfferSkill[],
		title: JobOfferTItle,
		vacant: JobOfferVacant,
		likes: JobOfferLike[],
		complaint: JobOfferComplaint[],
		date: JobOfferDate,
		Id: JobOfferId,
		_gigDuration?: GigDuration,
	){
		const offer = new JobOffer(description, salary,skills, title, vacant, likes, complaint, date, OfferStatus.notPublished, Id, );
		offer.eventRecorder.push(new JobOfferCreated(Id,description,salary,skills,title,vacant,likes,complaint,date, OfferStatus.notPublished));
		return offer;
	}
	modified(
		description: JobOfferDescription,
		salary: JobOfferSalary,
		skills: JobOfferSkill[],
		title: JobOfferTItle,
		vacant: JobOfferVacant,
		likes: JobOfferLike[],
		complaint: JobOfferComplaint[],
		date: JobOfferDate,
		Id: JobOfferId,
		_gigDuration?: GigDuration,
	){
		this.description = description,
			this.salary = salary,
			this.skills = skills,
			this.title = title,
			this.vacant = vacant,
			this.likes = likes
		this.complaint = complaint,
			this.date = date,
			this.Id = Id
		this.eventRecorder.push(new JobOfferModified(Id,description,salary,skills,title,vacant,likes,complaint,date, OfferStatus.notPublished))
	}
	
	/**
	 * Actualiza el estado de una entrevista presencial a "accepted", generando un evento de dominio si el cambio fue
	 * exitoso.
	 *
	 * @param interviewTitle Título de la entrevista.
	 * @param interviewDescription Descripción de la entrevista.
	 * @param interviewDate Fechas de inicio y finalización de la entrevista.
	 * @param interviewInterviewed Entrevistado.
	 * @param interviewInterviewer Entrevistador.
	 * @param interviewStatus Estado actual de la entrevista.
	 * @param interviewId Identificador de la entrevista.
	 * @param interviewDirection Lugar en donde se realizará la entrevista.
	 * */
	public acceptInPersonInterview(
		interviewTitle: InterviewTitle,
		interviewDescription: InterviewDescription,
		interviewDate: InterviewDate,
		interviewInterviewed: InterviewInterviewed,
		interviewInterviewer: InterviewInterviewer,
		interviewStatus: InterviewStatus,
		interviewId: InterviewId,
		interviewDirection: InPersonInterviewDirection
	): void {
		try {
			const interview = new InPersonInterview(
				interviewTitle,
				interviewDescription,
				interviewDate,
				interviewInterviewed,
				interviewInterviewer,
				interviewStatus,
				interviewId,
				interviewDirection
			);
			
			interview.acceptInterview(); // Cambiar el estado de la entrevista.
			
			// Generación del evento de dominio.
			const interviewAcceptedEvent: IDomainEvent
				= new InterviewAccepted(interview.getInterviewId(), interview.getStatus());
			this.eventRecorder.push(interviewAcceptedEvent);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	
	/**
	 * Actualiza el estado de una entrevista presencial a "accepted", generando un evento de dominio si el cambio fue
	 * exitoso.
	 *
	 * @param interviewTitle Título de la entrevista.
	 * @param interviewDescription Descripción de la entrevista.
	 * @param interviewDate Fechas de inicio y finalización de la entrevista.
	 * @param interviewInterviewed Entrevistado.
	 * @param interviewInterviewer Entrevistador.
	 * @param interviewStatus Estado actual de la entrevista.
	 * @param interviewId Identificador de la entrevista.
	 * @param interviewUrlMeeting URL de la entrevista virtual.
	 * */
	public acceptOnlineInterview(
		interviewTitle: InterviewTitle,
		interviewDescription: InterviewDescription,
		interviewDate: InterviewDate,
		interviewInterviewed: InterviewInterviewed,
		interviewInterviewer: InterviewInterviewer,
		interviewStatus: InterviewStatus,
		interviewId: InterviewId,
		interviewUrlMeeting: OnlineInterviewUrlMeeting
	): void {
		try {
			const interview = new OnlineInterview(
				interviewTitle,
				interviewDescription,
				interviewDate,
				interviewInterviewed,
				interviewInterviewer,
				interviewStatus,
				interviewId,
				interviewUrlMeeting
			);
			
			interview.acceptInterview(); // Cambiar el estado de la entrevista.
			
			// Generación del evento de dominio.
			const interviewAcceptedEvent: IDomainEvent
				= new InterviewAccepted(interview.getInterviewId(), interview.getStatus());
			this.eventRecorder.push(interviewAcceptedEvent);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	
	protected invariants() {}
}