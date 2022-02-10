import IDto from "src/application/shared/interfaces/IDto";

export default class RejectPostulationDto extends IDto {
    id: string;
    status: string;
    date: Date;
  }