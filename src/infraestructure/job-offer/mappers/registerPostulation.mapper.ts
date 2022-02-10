import { BadRequestException } from '@nestjs/common';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import { Postulation } from 'src/domain/job-offer/entities/postulation';
import { PostulationDate } from 'src/domain/job-offer/value-objects/postulation/PostulationDate';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import PostulationOrm from '../orm/postulation.orm';


export default class RegisterPostulationMapper {
  static convertManyPostulationsToFound(
    postulations: PostulationOrm[],
  ): PostulationFound[] {
    const postulationsToReturn: PostulationFound[] = postulations.map((postulation) => {
      const postulationFound: PostulationFound = {
        ...postulation,
      };
      return postulationFound;
    });

    return postulationsToReturn;
  }
 /* public static convertRegisterPostulationRequestToDTO(
    id: string,
    postulation: RegisterPostulationRequest,
  ): PostulationDto {
    const postulationDto: PostulationDto = {
      id: id,
      ...postulation,
    };
    return postulationDto;
  }*/

  public static convertPostulationORMtoDomain(
    postulationORM: PostulationOrm,
  ): Postulation<PostulationStatus> {
    const {
      id,
      date,
      status,
    } = postulationORM;
    try {
      let postulation: any = Postulation.create(
        this.convertToPostulationDate(date),
      );
      if (status == PostulationStatus.reject) {
        postulation = postulation.suspendPostulation();
      }
      return postulation;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public static convertToPostulationDate(date: Date): PostulationDate {
    return PostulationDate.create(date);
  }
 
 
  
}
