import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controllers/interview.controller';
import { CreateInterviewHandler } from './handlers/createInterview.handler';
import { findInterviewByIdHandler } from './handlers/findInterviewById.handler';
import { findInterviewByPostulationHandler } from './handlers/findInterviewByPostulation.handler';
import { InterviewRepository } from './repositories/InterviewRepository.repository';
import { InterviewService } from './services/interview.service';
import {AcceptInterviewHandler} from "./handlers/acceptInterview.handler";

@Module({
    imports: [CqrsModule, 
        TypeOrmModule.forFeature([InterviewRepository])],
    controllers: [InterviewController],
    providers:[
        InterviewService, 
        CreateInterviewHandler,
        findInterviewByIdHandler,
        findInterviewByPostulationHandler,
        AcceptInterviewHandler
    ]
})
export class InterviewModule {}
