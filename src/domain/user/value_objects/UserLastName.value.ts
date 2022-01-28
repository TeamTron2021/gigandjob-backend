import { UserLastNameEmpty } from '../errors/UserLastNameEmpty.error';

export class UserLastName {
  public readonly value: string;

  constructor(value: string) {
    if (!value || !value.trim()) throw new UserLastNameEmpty();
    this.value = value;
  }
}
