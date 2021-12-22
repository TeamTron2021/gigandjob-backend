import JobOfferComplaintId from "../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId";
import UniqueId from "../../../../shared/domain/UniqueUUID";

describe('Value Object JobOfferComplaintId', () =>{
	test('Should return a error: JobOfferComplaintId',() =>{
		const id: any = null;
		expect(() => JobOfferComplaintId.create(id)).toThrowError('El id de JobOfferComplaint no puede estar vacio');
	})
	test('Should return a error: JobOfferComplaintId',() =>{
		const id: any = undefined;
		expect(() => JobOfferComplaintId.create(id)).toThrowError('El id de JobOfferComplaint no puede estar vacio');
	})
	test('Should return error structure',() =>{
		const id: any = '';
		expect(() => JobOfferComplaintId.create(id)).toThrowError('El id de JobOfferComplaint no posee la estructura correcta');
	})
	test('Should return error structure',() =>{
		const id: any = '          ';
		expect(() => JobOfferComplaintId.create(id)).toThrowError('El id de JobOfferComplaint no posee la estructura correcta');
	})
	test('Should return error structure uuid',() =>{
		const id: string = "a24a6ea4-ce75-4665-a070"; // Correct structure "a24a6ea4-ce75-4665-a070-57453082c256"
		expect(() => JobOfferComplaintId.create(id)).toThrowError('El id de JobOfferComplaint no posee la estructura correcta');
	})
	test('Should return the happy path',() =>{
		const id = new UniqueId().getId(); // structure uuid "a24a6ea4-ce75-4665-a070-57453082c256"
		expect(JobOfferComplaintId.create(id)).toBeInstanceOf(JobOfferComplaintId);
	})
})