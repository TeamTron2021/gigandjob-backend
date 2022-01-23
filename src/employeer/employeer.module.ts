import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeerController } from './infrastructure/controllers/employeer.controller';
import { findEmployeerByIdHandler } from './infrastructure/handlers/findEmployeerById.handler';
import { RegisterEmployeerHandler } from './infrastructure/handlers/registerEmployeer.handler';
import { EmployeerRepository } from './infrastructure/repositories/EntityRepository.repository';
import { EmployeerService } from './infrastructure/services/employeer.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmployeerRepository])],
  controllers: [EmployeerController],
  providers: [
    EmployeerService,
    RegisterEmployeerHandler,
    findEmployeerByIdHandler,
  ],
})
export class EmployeerModule {}
