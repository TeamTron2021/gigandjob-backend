import { UserID } from '../value_objects/UserID.value';

export class UserAccountDeleted {
  constructor(public ID: UserID) {}
}
