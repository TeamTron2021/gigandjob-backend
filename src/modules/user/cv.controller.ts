import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoadCV } from 'src/application/user/commands/LoadCV.command';
import { CVDto } from 'src/application/user/CV.dto';
import { CVService } from 'src/application/user/CV.service';

type CVLoadForm = {
  academicFormation: string[];
  skills: string[];
  courses: string[];
};

@Controller('cvs')
export class CVController {
  constructor(private readonly _cvService: CVService) {}

  @Get(':id')
  async getCV(@Param('id') id: string): Promise<CVDto> {
    return await this._cvService.get(id);
  }

  @Post()
  async register(@Body() cv: CVLoadForm): Promise<void> {
    const command: LoadCV = new LoadCV(
      cv.academicFormation,
      cv.skills,
      cv.courses,
    );
    command.execute(this._cvService);
  }
}
