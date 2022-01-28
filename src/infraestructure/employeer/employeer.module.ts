import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeerController } from './controllers/employeer.controller';
import { findEmployeerByIdHandler } from './handlers/findEmployeerById.handler';
import { FindEmployeersHandler } from './handlers/findEmployeers.handler';
import { RegisterEmployeerHandler } from './handlers/registerEmployeer.handler';
import { EmployeerRepository } from './repositories/EntityRepository.repository';
import { EmployeerService } from './services/employeer.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmployeerRepository])],
  controllers: [EmployeerController],
  providers: [
    EmployeerService,
    RegisterEmployeerHandler,
    findEmployeerByIdHandler,
    FindEmployeersHandler,
  ],
})
export class EmployeerModule {}
