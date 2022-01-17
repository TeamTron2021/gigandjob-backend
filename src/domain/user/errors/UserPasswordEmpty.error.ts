export class UserPasswordEmpty extends Error {
  constructor() {
    super('Password empty');
  }
}
