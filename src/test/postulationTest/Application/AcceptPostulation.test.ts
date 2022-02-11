import { randomUUID } from "node:crypto";
import { AcceptPostulationCommand } from "src/application/job-offer/commands/acceptPostulation.command";
import AcceptPostulationMapper from "src/application/job-offer/mappers/AcceptPostulationMapper";
import AcceptPostulationDto from "src/application/job-offer/ports/AcceptPostulationStatus.dto";
import postulationRepository from "src/application/job-offer/repositories/postulation.repository";
import AcceptInterviewService from "src/application/job-offer/services/acceptInterview.service";
import AcceptPostulationService from "src/application/job-offer/services/AcceptPostulation.service";
import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationDate } from "src/domain/job-offer/value-objects/postulation/PostulationDate";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import { PostulationUUID } from "src/domain/job-offer/value-objects/postulation/PostulationUUID";
import IUpdatePostulationStatusMapper from "../../../application/job-offer/mappers/UpdatePostulationStatus.mapper";

describe('Accept postulation test', () => {
    const mockPublishFn = jest.fn().mockImplementation();
    let mockUPostulationID: string = randomUUID();
    let mockPostulation: Postulation<PostulationStatus> = new Postulation(
      new PostulationDate(new Date(2022, 2, 3)),
      PostulationStatus.isSend,
    );
    let mockpostulationDto: AcceptPostulationDto = {
      id: mockUPostulationID,
      date: new Date(2022, 2, 3),
      status: PostulationStatus[1],
    };
    let mockGetFn = jest.fn().mockImplementation((uuid) => mockpostulationDto);
    let mockGetpostulationWithStatusFn = jest
      .fn()
      .mockImplementation((uuid, options) => mockPostulation);
    let mockGetUserFn = jest.fn().mockImplementation((uuid) => mockPostulation);
    let service: AcceptPostulationService = new AcceptPostulationService();
    test('Should update postulation status to accept', async () => {
        let acceptedPostulationDto: AcceptPostulationDto;
        
        const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(mockpostulationDto);
        const postulationToAccept: Postulation<PostulationStatus> = mapper.map(); 
        postulationToAccept.acceptPostulation();

      expect(PostulationStatus.passed);
    });
  });