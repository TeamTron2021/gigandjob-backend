import { IsNotEmpty, IsString } from 'class-validator';

export class SkillRequest {
  @IsNotEmpty()
  @IsString()
  skill: string;
}
