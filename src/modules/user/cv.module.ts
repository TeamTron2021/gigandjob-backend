import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CVService } from 'src/application/user/CV.service';
import { CVCommandDao } from './cv-command.dao';
import { CVQueryDao } from './cv-query.dao';
import { CVController } from './cv.controller';
import { CVPublisher } from './cv.publisher';
import { CVRepository } from './cv.repository';
import { CVLoadedHandler } from './handlers/cv-loaded.handler';
import { CVQueryListener } from './handlers/cv-query.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CVCommandDao, CVQueryDao])],
  providers: [
    CVRepository,
    CVPublisher,
    CVLoadedHandler,
    CVQueryListener,
    {
      provide: CVService,
      useFactory: (publisher: CVPublisher, repository: CVRepository) =>
        new CVService(repository, publisher),
      inject: [CVPublisher, CVRepository],
    },
  ],
  controllers: [CVController],
})
export class CVModule {}
