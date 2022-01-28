import { Controller } from '@nestjs/common';
import { Body, Post} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateJobOfferComplaintcommand } from 'src/infraestructure/jobOfferComplaint/command/CreateJobOfferComplaintcommand';
import { CreateJobOfferComplaintDtoIn } from 'src/application/JobOfferComplaint/dto/createJobOfferComplaintDto';

@Controller('complaint')
export class createJobOffercompalintController {
    constructor(private readonly commandBus: CommandBus){}

    @Post()
    async create(
     @Body() complaint: CreateJobOfferComplaintDtoIn
   ): Promise<any> {
    return await  this.commandBus.execute<CreateJobOfferComplaintcommand,any>(
       new CreateJobOfferComplaintcommand(complaint),
     );
   }
  
}