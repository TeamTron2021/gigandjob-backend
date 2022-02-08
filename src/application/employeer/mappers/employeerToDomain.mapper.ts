import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import EmployeerCompanyMail from 'src/domain/employeer/value-objects/employeer/EmployeerCompanyMail';
import EmployeerCompanyName from 'src/domain/employeer/value-objects/employeer/EmployeerCompanyName';
import EmployeerId from 'src/domain/employeer/value-objects/employeer/EmployeerId';
import EmployeerIndustry from 'src/domain/employeer/value-objects/employeer/EmployeerIndustry';
import EmployeerLocalization from 'src/domain/employeer/value-objects/employeer/EmployeerLocalization';
import EmployeerRif from 'src/domain/employeer/value-objects/employeer/EmployeerRif';
import EmployeerDto from '../ports/employeer.dto';

export default class EmployeerDtoToDomainMapper {
  constructor(private readonly employeerDto: EmployeerDto) {}

  
  public convertDTOToDomain(): Employeer<EmployeerStatus> {
    const { id, companyName, companyMail, rif, latitude, longitude, industry } =
      this.employeerDto;
    const idDomain: EmployeerId = this.convertToEmployeerId(id);
    const companyNameDomain: EmployeerCompanyName =
      this.convertToCompanyName(companyName);
    const companyMailDomain: EmployeerCompanyMail =
      this.convertToCompanyMail(companyMail);
    const rifDomain: EmployeerRif = this.convertToEmployeerRif(rif);
    const employeerLocalization: EmployeerLocalization =
      this.convertToEmployeerLocalization(latitude, longitude);
    const industryDomain: EmployeerIndustry =
      this.convertToEmployeerIndustry(industry);
    return Employeer.create(
      companyMailDomain,
      companyNameDomain,
      idDomain,
      industryDomain,
      rifDomain,
      employeerLocalization,
    );
  }
  private convertToCompanyMail(companyMail: string): EmployeerCompanyMail {
    return EmployeerCompanyMail.create(companyMail);
  }
  private convertToCompanyName(companyName: string): EmployeerCompanyName {
    return EmployeerCompanyName.create(companyName);
  }
  private convertToEmployeerId(id: string): EmployeerId {
    return EmployeerId.create(id);
  }
  private convertToEmployeerIndustry(industry: string): EmployeerIndustry {
    return EmployeerIndustry.create(industry);
  }
  private convertToEmployeerRif(rif: string): EmployeerRif {
    return EmployeerRif.create(rif);
  }
  private convertToEmployeerLocalization(
    latitude: string,
    longitude: string,
  ): EmployeerLocalization {
    return EmployeerLocalization.create(latitude, longitude);
  }
}
