import {UserAccountDeleted} from "../../../domain/user/domain_events/UserAccountDeleted.event"
import {UserConfirmed} from "../../../domain/user/domain_events/UserConfirmed.event"
import {UserDataUpdated} from "../../../domain/user/domain_events/UserDataUpdated.event"
import {UserRegistered} from "../../../domain/user/domain_events/UserRegistered.event"
import {UserStatus} from "../../../domain/user/enums/UserStatus.enum"
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
	test('Should update the user data',() =>{
		const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
		user.updateData(
			new UserFirstName("Jolyne"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jolyne-kujo@joestar.com"), 
			new UserPassword("stone-free")	
		)
		const event = new UserDataUpdated(
			user.getID(),
			user.firstname,
			user.lastname,
			user.birthday,
			user.email,
			user.password
		)
		expect(user.firstname).toStrictEqual(new UserFirstName("Jolyne"))
		expect(user.lastname).toStrictEqual(new UserLastName("Kujo"))
		expect(user.birthday).toStrictEqual(new UserBirthday(new Date(0)))
		expect(user.email).toStrictEqual(new UserEmail("jolyne-kujo@joestar.com"))
		expect(user.password).toStrictEqual(new UserPassword("stone-free"))
		expect(user.getEvents()).toContainEqual(event)
	})
	test('Should delete user account',() =>{
		const user = User.register(
			new UserFirstName("Johnny"), 
			new UserLastName("Joestar"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("johnny-joestar@joestar.com"), 
			new UserPassword("tusk-act4")
		)
		const event = new UserAccountDeleted(
			user.getID(),
		)
		user.deleteAccount()
		expect(user.getEvents()).toContainEqual(event)
	})
})
