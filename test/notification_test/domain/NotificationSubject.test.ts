import {NotificationSubjectEmpty} from "../../../domain/notification/errors/NotificationSubjectEmpty.error"
import {NotificationSubject} from "../../../domain/notification/values_objects/NotificationSubject.value"

describe('Value Object NotificationSubject', () =>{
	test('Should return a error: NotificationIdEmpty',() =>{
		const subject: any = null
		expect(() => new NotificationSubject(subject)).toThrowError(new NotificationSubjectEmpty())
	})
	test('Should return a error: NotificationIdEmpty',() =>{
		const subject: any = undefined
		expect(() => new NotificationSubject(subject)).toThrowError(new NotificationSubjectEmpty())
	})
	test('Should return a error: NotificationIdEmpty',() =>{
		expect(() => new NotificationSubject("")).toThrowError(new NotificationSubjectEmpty())
	})
	test('Should return a error: NotificationIdEmpty',() =>{
		expect(() => new NotificationSubject("  ")).toThrowError(new NotificationSubjectEmpty())
	})
	test('Should return a correct NotificationID',() =>{
		expect(new NotificationSubject("Registro exitoso")).toBeInstanceOf(NotificationSubject)
	})
})
