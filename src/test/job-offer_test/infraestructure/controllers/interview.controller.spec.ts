import {InterviewController} from "../../../../infraestructure/job-offer/controllers/interview.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {InterviewService} from "../../../../infraestructure/job-offer/services/interview.service";
import AcceptInterviewService from "../../../../application/job-offer/services/acceptInterview.service";
import {CommandBus, CqrsModule} from "@nestjs/cqrs";
import CreateInterviewDto from "../../../../application/job-offer/ports/createInterview.dto";
import CreateInterviewRequest from "../../../../infraestructure/job-offer/request/createInterviewRequest.request";
import {FindPostulationByIdRequest} from "../../../../infraestructure/job-offer/request/findPostulationById.request";
import {InterviewStatus} from "../../../../domain/job-offer/shared/InterviewStatus.enum";
import UniqueId from "../../../../shared/domain/UniqueUUID";
import {FindInterviewByIdRequest} from "../../../../infraestructure/job-offer/request/findInterviewById.request";

describe ('InterviewController', () => {
	let interviewController: InterviewController;
	/*let mockInterviewService = { // Mock del servicio (de infraestructura).
		createInterview: jest.fn((dto) => { // método a simular.
			return {
				id: new UniqueId().getId(),
				...dto, // incorporar el objeto a crear.
			}
		})
	};*/
	// let mockAcceptInterviewService = {}; // Mock del servicio de infraestructura.
	let spyService: InterviewService;
	
	beforeAll(async () => {
		/*const module: TestingModule = await Test.createTestingModule({ // Definición del módulo para probar el controlador.
			imports: [CqrsModule],
			controllers: [InterviewController],
			providers: [InterviewService/!*, AcceptInterviewService*!/], // Servicios a usar.
		}).overrideProvider(InterviewService) // El servicio a sustituir.
			.useValue(mockInterviewService) // Mock que servirá como sustituto del servicio anterior.
			// .overrideProvider(AcceptInterviewService).useValue(mockAcceptInterviewService)
			.compile(); // Construcción del módulo para la prueba.
		
		interviewController = module.get<InterviewController>(InterviewController); // Instanciación del controlador.*/
		
		const ServiceProvider = {
			provide: InterviewService,
			useFactory: () => ({
				acceptInterview: jest.fn(() => {}),
			})
		}
		
		const app: TestingModule = await Test.createTestingModule({
			controllers: [InterviewController],
			providers: [InterviewService, ServiceProvider],
		}).compile();
		
		interviewController = app.get<InterviewController>(InterviewController);
		spyService = app.get<InterviewService>(InterviewService);
	});
	
	it('should be defined', () => {
		expect(interviewController).toBeDefined();
	});
	
	/*it('should create an interview', () => {
		const date = new Date();
		const interviewToCreateDto: CreateInterviewRequest = {
			title: 'Entrevista de prueba 1',
			description: 'Esta es una entrevista de prueba',
			date: date
		};
		
		const postulationId: FindPostulationByIdRequest = {
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
		};
		
		expect(interviewController.createInterview(interviewToCreateDto, postulationId)).toEqual({
			id: expect.any(String),
			status: InterviewStatus.created,
			...interviewToCreateDto
		})
	});*/
	
	test('calling acceptInterview method', () => {
		const interviewToAcceptId: FindInterviewByIdRequest = {
			id: 'c61ffdb0-3ddb-4556-8788-71722676177b'
		};
		
		interviewController.acceptInterview(interviewToAcceptId);
		expect(spyService.acceptInterview).toHaveBeenCalled();
		expect(spyService.acceptInterview).toBeCalledWith(interviewToAcceptId);
	})
})