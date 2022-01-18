import { CVAproved } from '../../../src/domain/user/domain_events/CVAproved.event';
import { CVRejected } from '../../../src/domain/user/domain_events/CVRejected.event';
import { UserAccountDeleted } from '../../../src/domain/user/domain_events/UserAccountDeleted.event';
import { UserConfirmed } from '../../../src/domain/user/domain_events/UserConfirmed.event';
import { UserDataUpdated } from '../../../src/domain/user/domain_events/UserDataUpdated.event';
import { UserReactivated } from '../../../src/domain/user/domain_events/UserReactivated.event';
import { UserRegistered } from '../../../src/domain/user/domain_events/UserRegistered.event';
import { UserSuspended } from '../../../src/domain/user/domain_events/UserSuspended.event';
import { UserStatus } from '../../../src/domain/user/enums/UserStatus.enum';
import { User } from '../../../src/domain/user/User.aggregate';
import CVAcademicFormation from '../../../src/domain/user/value_objects/CVAcademicFormation.value';
import CVCourses from '../../../src/domain/user/value_objects/CVCourses.value';
import CVSkills from '../../../src/domain/user/value_objects/CVSkills.value';
import { UserBirthday } from '../../../src/domain/user/value_objects/UserBirthday.value';
import { UserEmail } from '../../../src/domain/user/value_objects/UserEmail.value';
import { UserFirstName } from '../../../src/domain/user/value_objects/UserFirstName.value';
import { UserLastName } from '../../../src/domain/user/value_objects/UserLastName.value';
import { UserPassword } from '../../../src/domain/user/value_objects/UserPassword.value';

describe('User Aggregate', () => {
  test('Should return a User and the User is registered', () => {
    const user = User.register(
      new UserFirstName('Jotaro'),
      new UserLastName('Kujo'),
      new UserBirthday(new Date(0)),
      new UserEmail('jotaro-kujo@joestar.com'),
      new UserPassword('star-platinum'),
    );
    expect(user).toBeInstanceOf(User);
    const event = new UserRegistered(
      user.ID,
      user.firstname,
      user.lastname,
      user.birthday,
      user.email,
      user.password,
      user.status,
    );
    expect(user.getEvents()).toContainEqual(event);
  });
  test('Should return a User and the User is confirmed', () => {
    const user = User.register(
      new UserFirstName('Jotaro'),
      new UserLastName('Kujo'),
      new UserBirthday(new Date(0)),
      new UserEmail('jotaro-kujo@joestar.com'),
      new UserPassword('star-platinum'),
    );
    const userConfirmed = user.confirm();
    expect(userConfirmed).toBeInstanceOf(User);
    expect(userConfirmed.status).toBe(UserStatus.Active);
    const event = new UserConfirmed(user.ID, userConfirmed.status);
    expect(userConfirmed.getEvents()).toContainEqual(event);
  });
  test('Should update the user data', () => {
    const user = User.register(
      new UserFirstName('Jotaro'),
      new UserLastName('Kujo'),
      new UserBirthday(new Date(0)),
      new UserEmail('jotaro-kujo@joestar.com'),
      new UserPassword('star-platinum'),
    );
    user.updateData(
      new UserFirstName('Jolyne'),
      new UserLastName('Kujo'),
      new UserBirthday(new Date(0)),
      new UserEmail('jolyne-kujo@joestar.com'),
      new UserPassword('stone-free'),
    );
    const event = new UserDataUpdated(
      user.ID,
      user.firstname,
      user.lastname,
      user.birthday,
      user.email,
      user.password,
    );
    expect(user.firstname).toStrictEqual(new UserFirstName('Jolyne'));
    expect(user.lastname).toStrictEqual(new UserLastName('Kujo'));
    expect(user.birthday).toStrictEqual(new UserBirthday(new Date(0)));
    expect(user.email).toStrictEqual(new UserEmail('jolyne-kujo@joestar.com'));
    expect(user.password).toStrictEqual(new UserPassword('stone-free'));
    expect(user.getEvents()).toContainEqual(event);
  });
  test('Should delete user account', () => {
    const user = User.register(
      new UserFirstName('Johnny'),
      new UserLastName('Joestar'),
      new UserBirthday(new Date(0)),
      new UserEmail('johnny-joestar@joestar.com'),
      new UserPassword('tusk-act4'),
    );
    const event = new UserAccountDeleted(user.ID);
    user.deleteAccount();
    expect(user.getEvents()).toContainEqual(event);
  });
  test('Should suspend the user', () => {
    const user = User.register(
      new UserFirstName('Giorno'),
      new UserLastName('Giovanna'),
      new UserBirthday(new Date(1985, 4, 16)),
      new UserEmail('giorno-giovanna@joestar.com'),
      new UserPassword('gold-experience'),
    );
    const userConfirmed = user.confirm();
    const userSuspended = userConfirmed.suspend();
    const event = new UserSuspended(user.ID, userSuspended.status);
    expect(userSuspended.getEvents()).toContainEqual(event);
  });
  test('Should reactive the user', () => {
    const user = User.register(
      new UserFirstName('Giorno'),
      new UserLastName('Giovanna'),
      new UserBirthday(new Date(1985, 4, 16)),
      new UserEmail('giorno-giovanna@joestar.com'),
      new UserPassword('gold-experience'),
    );
    const userConfirmed = user.confirm();
    const userSuspended = userConfirmed.suspend();
    const userReactived = userSuspended.reactive();
    const event = new UserReactivated(user.ID, userReactived.status);
    expect(userReactived.getEvents()).toContainEqual(event);
  });
  test('Should approve CV to user', () => {
    const user = User.register(
      new UserFirstName('Jonathan'),
      new UserLastName('Joestar'),
      new UserBirthday(new Date(1869, 4, 4)),
      new UserEmail('jonathan@joestar.com'),
      new UserPassword('jonathan-joestar'),
    );

    user.uploadCV(
      [new CVAcademicFormation('Speedwagon Foundtation')],
      [new CVSkills('hamon')],
      [new CVCourses('Zeppeli Hamon Classes')],
    );

    const userActivated = user.approveCV();

    if (userActivated) {
      expect(userActivated.status).toBe(UserStatus.Active);

      if (user.cv && userActivated.cv) {
        const event = new CVAproved(user.cv.getID(), userActivated.cv.status);
        expect(userActivated.getEvents()).toContainEqual(event);
      }
    }
  });

  test('Should reject CV to user', () => {
    const user = User.register(
      new UserFirstName('Jonathan'),
      new UserLastName('Joestar'),
      new UserBirthday(new Date(1869, 4, 4)),
      new UserEmail('jonathan@joestar.com'),
      new UserPassword('jonathan-joestar'),
    );

    user.uploadCV(
      [new CVAcademicFormation('Speedwagon Foundtation')],
      [new CVSkills('hamon')],
      [new CVCourses('Zeppeli Hamon Classes')],
    );

    user.rejectCV();

    if (user.cv && user.cv.isRejected()) {
      const event = new CVRejected(user.cv.getID(), user.cv.status);
      expect(user.getEvents()).toContainEqual(event);
    }
  });
});
