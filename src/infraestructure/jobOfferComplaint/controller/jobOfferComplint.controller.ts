import { Controller } from '@nestjs/common';
import { Body, Post} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateJobOfferComplaintcommand } from 'src/aplication/JobOfferComplaint/command/CreateJobOfferComplaintcommand';
import { CreateJobOfferComplaintDto } from 'src/aplication/JobOfferComplaint/dto/createJobOfferComplaintDto';

@Controller('complaint')
export class createJobOffercompalint {
    constructor(private readonly commandBus: CommandBus){}

    @Post()
    async create(
     @Body() complaint: CreateJobOfferComplaintDto
   ): Promise<any> {
    return await  this.commandBus.execute<CreateJobOfferComplaintcommand,any>(
       new CreateJobOfferComplaintcommand(complaint),
     );
   }
  
}