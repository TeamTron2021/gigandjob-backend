import {UserConfirmed} from "../../../domain/user/domain_events/UserConfirmed.Event"
import {UserRegistered} from "../../../domain/user/domain_events/UserRegistered.Event"
import {UserStatus} from "../../../domain/user/enums/UserStatus.Enum"
import {User} from "../../../domain/user/User.aggregate"
import {UserBirthday} from "../../../domain/user/value_objects/UserBirthday.value"
import {UserEmail} from "../../../domain/user/value_objects/UserEmail.value"
import {UserFirstName} from "../../../domain/user/value_objects/UserFirstName.value"
import {UserLastName} from "../../../domain/user/value_objects/UserLastName.value"
import {UserPassword} from "../../../domain/user/value_objects/UserPassword.value"

describe('User Aggregate', () =>{
	test('Should return a User and the User is registered',() =>{
		const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
		expect(user).toBeInstanceOf(User)
		const event = new UserRegistered(
			user.getID(),
			user.firstname,
			user.lastname,
			user.birthday,
			user.email,
			user.password,
			user.status
		)
		expect(user.getEvents()).toContainEqual(event)
	})
	test('Should return a User and the User is confirmed',() =>{
		const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
		const userConfirmed = user.confirm()
		expect(userConfirmed).toBeInstanceOf(User)
		expect(userConfirmed.status).toBe(UserStatus.Active)
		const event = new UserConfirmed(
			userConfirmed.getID(),
			userConfirmed.status
		)
		expect(userConfirmed.getEvents()).toContainEqual(event)
	})
})
