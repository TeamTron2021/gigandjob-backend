import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controllers/interview.controller';
import { CreateInterviewHandler } from './handlers/createInterview.handler';
import { findInterviewByIdHandler } from './handlers/findInterviewById.handler';
import { InterviewORM } from './orm/interview.orm';
import { InterviewRepository } from './repositories/InterviewRepository.repository';
import { InterviewService } from './services/interview.service';

@Module({
    imports: [CqrsModule, 
        TypeOrmModule.forFeature([
            InterviewRepository,
            InterviewORM,
        ])],
    controllers: [InterviewController],
    providers:[
        InterviewService, 
        CreateInterviewHandler,
        findInterviewByIdHandler,
      
        findInterviewByIdHandler,
    ]
})
export class InterviewModule {}
