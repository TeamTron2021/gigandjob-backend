import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { EmployeerStatus } from "../../shared/EmployeerStatus.enum";
import EmployeerId from "../../value-objects/employeer/EmployeerId";

export default class EmployeerSuspended implements IDomainEvent {
    constructor(
        public id: EmployeerId,
        public status:EmployeerStatus
    ) {}
}