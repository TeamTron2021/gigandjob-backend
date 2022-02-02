import e from 'express';
import IDto from 'src/application/shared/interfaces/IDto';
import IAplicationService from '../../shared/interfaces/IAplicationService';
import EmployeerDtoToDomainMapper from '../mappers/employeerToDomain.mapper';
import EmployeerDto from '../ports/employeer.dto';
import EmployeerToSaveDto from '../ports/employeerToSave.dto';
export default class RegisterEmployeerService implements IAplicationService {
  execute(employeer: EmployeerDto): EmployeerToSaveDto {
    const mapperDtoToDomain: EmployeerDtoToDomainMapper =
      new EmployeerDtoToDomainMapper(employeer);
    const employeerToValidate = mapperDtoToDomain.convertDTOToDomain();
    const employeerToSave: EmployeerToSaveDto = {
      id: employeerToValidate.getId().getId(),
      companyName: employeerToValidate.CompanyName.getCompanyName(),
      companyMail: employeerToValidate.CompanyMail.getEmail(),
      rif: employeerToValidate.rif.getRif(),
      latitude: employeerToValidate.localization.getLatitude(),
      longitude: employeerToValidate.localization.getLatitude(),
      industry: employeerToValidate.industry.getIndustry(),
      status: employeerToValidate.status,
    };
    return employeerToSave;
  }
}
