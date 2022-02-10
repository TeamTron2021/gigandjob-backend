export class UserPasswordTooShort extends Error {
  constructor() {
    super('Password too short');
  }
}
