import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { EmployeerStatus } from "../../shared/EmployeerStatus.enum";
import EmployeerId from "../../value-objects/employeer/EmployeerId";

export default class EmployeerReactived implements IDomainEvent {
    constructor(
        public id: EmployeerId,
        public status:EmployeerStatus
    ) {}
}