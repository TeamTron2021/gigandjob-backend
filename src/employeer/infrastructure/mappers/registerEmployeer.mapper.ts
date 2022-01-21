import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import EmployeerCompanyMail from 'src/domain/employeer/value-objects/employeer/EmployeerCompanyMail';
import EmployeerCompanyName from 'src/domain/employeer/value-objects/employeer/EmployeerCompanyName';
import EmployeerId from 'src/domain/employeer/value-objects/employeer/EmployeerId';
import EmployeerIndustry from 'src/domain/employeer/value-objects/employeer/EmployeerIndustry';
import EmployeerLocalization from 'src/domain/employeer/value-objects/employeer/EmployeerLocalization';
import EmployeerRif from 'src/domain/employeer/value-objects/employeer/EmployeerRif';
import EmployeerDto from '../../application/ports/employeer.dto';
import { EmployeerORM } from '../orm/employeer.orm';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';

export default class RegisterEmployeerMapper {
  public static convertRegisterEmployeerRequestToDTO(
    id: string,
    employeer: RegisterEmployeerRequest,
  ): EmployeerDto {
    const employeerDto: EmployeerDto = {
      id: id,
      ...employeer,
    };
    return employeerDto;
  }

  public static convertEmployeerORMtoDomain(
    employeerORM: EmployeerORM,
  ): Employeer<EmployeerStatus> {
    const {
      id,
      companyName,
      companyMail,
      rif,
      latitude,
      longitude,
      industry,
      status,
    } = employeerORM;
    return Employeer.create(
      this.convertToCompanyMail(companyMail),
      this.convertToCompanyName(companyName),
      this.convertToEmployeerId(id),
      this.convertToEmployeerIndustry(industry),
      this.convertToEmployeerRif(rif),
      this.convertToEmployeerLocalization(latitude, longitude),
    );
  }

  public static convertToCompanyMail(
    companyMail: string,
  ): EmployeerCompanyMail {
    return EmployeerCompanyMail.create(companyMail);
  }
  public static convertToCompanyName(
    companyName: string,
  ): EmployeerCompanyName {
    return EmployeerCompanyName.create(companyName);
  }
  public static convertToEmployeerId(id: string): EmployeerId {
    return EmployeerId.create(id);
  }
  public static convertToEmployeerIndustry(
    industry: string,
  ): EmployeerIndustry {
    return EmployeerIndustry.create(industry);
  }
  public static convertToEmployeerRif(rif: string): EmployeerRif {
    return EmployeerRif.create(rif);
  }
  public static convertToEmployeerLocalization(
    latitude: string,
    longitude: string,
  ): EmployeerLocalization {
    return EmployeerLocalization.create(latitude, longitude);
  }
}
