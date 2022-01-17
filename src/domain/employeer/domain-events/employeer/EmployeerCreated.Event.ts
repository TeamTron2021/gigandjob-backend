import IDomainEvent from '../../../../shared/domain/IDomainEvent';
import { EmployeerStatus } from '../../shared/EmployeerStatus.enum';
import EmployeerCompanyMail from '../../value-objects/employeer/EmployeerCompanyMail';
import EmployeerCompanyName from '../../value-objects/employeer/EmployeerCompanyName';
import EmployeerId from '../../value-objects/employeer/EmployeerId';
import EmployeerIndustry from '../../value-objects/employeer/EmployeerIndustry';
import EmployeerLocalization from '../../value-objects/employeer/EmployeerLocalization';
import EmployeerRif from '../../value-objects/employeer/EmployeerRif';

export default class EmployeerCreated implements IDomainEvent {
  constructor(
    public CompanyMail: EmployeerCompanyMail,
    public CompanyName: EmployeerCompanyName,
    private id: EmployeerId,
    public industry: EmployeerIndustry,
    public rif: EmployeerRif,
    public status: EmployeerStatus,
    public localization: EmployeerLocalization,
  ) {}
}
