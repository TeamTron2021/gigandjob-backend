import {UserBirthdayEmpty} from "../../../domain/user/errors/UserBirthdayEmpty.error"
import {UserBirthdayInvalid} from "../../../domain/user/errors/UserBirthdayInvalid.error"
import {UserBirthday} from "../../../domain/user/value_objects/UserBirthday.value"

describe('Value Object UserBirthday', () =>{
	test('Should return a error: UserBirthdayEmpty',() =>{
		const day:any = null
		expect(() => new UserBirthday(day)).toThrowError(new UserBirthdayEmpty())
	})
	test('Should return a error: UserBirthdayEmpty',() =>{
		const day:any = undefined
		expect(() => new UserBirthday(day)).toThrowError(new UserBirthdayEmpty())
	})
	test('Should return a error: UserBirthdayInvalid',() =>{
		const today = new Date()
		var future = new Date()
		future.setDate(today.getDate()+1)
		expect(() => new UserBirthday(future)).toThrowError(new UserBirthdayInvalid())
	})
	test('Should return a correct UserBirthday',() =>{
		const today = new Date()
		var past = new Date()
		past.setFullYear(today.getFullYear()-20)
		expect(new UserBirthday(past)).toBeInstanceOf(UserBirthday)
	})
})
