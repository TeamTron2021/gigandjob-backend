import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './controllers/interview.controller';
import { CreateInterviewHandler } from './handlers/createInterview.handler';
import { SkillsORM } from './orm/skills.orm';
import { InterviewRepository } from './repositories/InterviewRepository.repository';
import { InterviewService } from './services/interview.service';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([InterviewRepository, SkillsORM])],
    controllers: [InterviewController],
    providers:[InterviewService, CreateInterviewHandler]
})
export class InterviewModule {}
