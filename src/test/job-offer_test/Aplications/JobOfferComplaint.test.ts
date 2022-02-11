//import { createjobOfferComplaintRepository } from '../../../infraestructure/jobOfferComplaint/repository/jobOfferComplaintRepository';
/*import { IjobOfferComplaintRepository } from '../../../application/JobOfferComplaint/out/IcomplaintRepository';
import { CreateJobOfferComplaintDtoIn } from '../../../application/JobOfferComplaint/dto/createJobOfferComplaintDtoIn';
import { mappersComplaint } from '../../../application/JobOfferComplaint/mappers/mapperComplaint';
import { JobOfferComplaintService } from 'src/application/JobOfferComplaint/Service/jobOfferComplaint.service';
import { JobOfferIdDtoInOut } from 'src/application/JobOfferComplaint/dto/JobOfferIdDto';

describe('Create JobOfferComplaint seervicio', () => {
  const mockServicetest = jest.fn();
  const mockServicetest2 = jest.fn();
  const mocktest: IjobOfferComplaintRepository = {
    createjobOfferComplaint: mockServicetest,
    UpdateAceptedobOfferComplaint: mockServicetest2,
  };

  const mappersComplaintTest: mappersComplaint = new mappersComplaint();

  const testService = new JobOfferComplaintService(
    mocktest,
    mappersComplaintTest,
  );
  it('Should Service complaint defined', () => {
    expect(testService).toBeDefined();
  });
  
  it('Should Service complaint ', () => {
    const probando = new mappersComplaint();

    const dtoIn: CreateJobOfferComplaintDtoIn =
      new CreateJobOfferComplaintDtoIn('La prueba');

    const dtoIdIn: JobOfferIdDtoInOut = new JobOfferIdDtoInOut(
      'dc987450-5e38-4058-abdd-536b7a19221f',
    );

    const funciona = probando.convertDtoToDomainCreate(dtoIn);
    const funciona2 = probando.convertDtoToDomainCreateJobOffferid(dtoIdIn);
    const mock = testService.createjobOfferComplaint(funciona, funciona2);

    expect(mock).toEqual(
      testService.createjobOfferComplaint(funciona, funciona2),
    );
  });
});*/
