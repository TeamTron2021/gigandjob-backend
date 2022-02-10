import { Controller, Param, Put } from '@nestjs/common';
import { Body, Post} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateJobOfferComplaintcommand } from '../../../infraestructure/jobOfferComplaint/command/CreateJobOfferComplaintcommand';
import { JobOfferIdDtoInOut } from '../../../application/JobOfferComplaint/dto/JobOfferIdDto';
import { UpdateJobOfferComplaintDtoIn } from '../../../application/JobOfferComplaint/dto/updateJobOfferComplaintDto';
import { ComplaintIdDtoInOut } from '../../../application/JobOfferComplaint/dto/ComplaintIdDto';
import { acceptJobOfferComplaintcommand} from '../command/AcceptJobOfferComplaintCommand';
import { rejectJobOfferComplaintcommand } from '../command/rejectJobOfferComplaint';
import { CreateJobOfferComplaintDtoIn } from '../../../application/JobOfferComplaint/dto/createJobOfferComplaintDtoIn';


@Controller('complaint')
export class createJobOffercompalintController {
    constructor(private readonly commandBus: CommandBus){}

    @Post('/:id')
    async create(
     @Param() JobOfferIdRequest: JobOfferIdDtoInOut,
     @Body() complaint: CreateJobOfferComplaintDtoIn,
   ): Promise<any> {
    return await  this.commandBus.execute<CreateJobOfferComplaintcommand,any>(
       new CreateJobOfferComplaintcommand(complaint, JobOfferIdRequest),
     );
   }


   @Put('/acept/:id')
   async AceptReporte(
    @Param() complaintId: ComplaintIdDtoInOut,
    @Body() complaint: UpdateJobOfferComplaintDtoIn,
  ): Promise<any> {
   return await  this.commandBus.execute<acceptJobOfferComplaintcommand,any>(
      new acceptJobOfferComplaintcommand(complaint, complaintId),
    );
  }

  @Put('/reject/:id')
  async RejectReporte(
   @Param() complaintId: JobOfferIdDtoInOut,
   @Body() complaint: UpdateJobOfferComplaintDtoIn,
 ): Promise<any> {
  return await  this.commandBus.execute<rejectJobOfferComplaintcommand,any>(
     new rejectJobOfferComplaintcommand(complaint, complaintId),
   );
 }
  
}