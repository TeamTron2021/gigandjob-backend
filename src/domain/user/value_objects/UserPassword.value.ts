import { UserPasswordEmpty } from '../errors/UserPasswordEmpty.error';
import { UserPasswordTooShort } from '../errors/UserPasswordTooShort.error';

export class UserPassword {
  public readonly value: string;

  constructor(value: string) {
    if (!value || !value.trim()) throw new UserPasswordEmpty();
    if (value.length < 8) throw new UserPasswordTooShort();
    this.value = value;
  }
}
