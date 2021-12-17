import {UserEmailEmpty} from "../../../domain/user/errors/UserEmailEmpty.error"
import {UserEmailInvalid} from "../../../domain/user/errors/UserEmailInvalid.error"
import {UserEmail} from "../../../domain/user/value_objects/UserEmail.value"

describe('Value Object UserEmail', () =>{
	test('Should response with error: UserEmailEmpty',() =>{
		const email:any = null
		expect(() => new UserEmail(email)).toThrowError(new UserEmailEmpty())
	})
	test('Should response with error: UserEmailEmpty',() =>{
		expect(() => new UserEmail("")).toThrowError(new UserEmailEmpty())
	})
	test('Should response with error: UserEmailInvalid, because dont have @',() =>{
		expect(() => new UserEmail("jotarokujo.com")).toThrowError(new UserEmailInvalid())
	})
	test('Should response with error: UserEmailInvalid, because dont have a valid domain',() =>{
		expect(() => new UserEmail("jotarokujo@com")).toThrowError(new UserEmailInvalid())
	})
	test('Should response a correct UserEmail instanced',() =>{
		expect(new UserEmail("jonathan@joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with many points in the domain',() =>{
		expect(new UserEmail("jotaro@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with capital letter',() =>{
		expect(new UserEmail("Jotaro@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with numbers',() =>{
		expect(new UserEmail("Jotaro123@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with numbers in the domain',() =>{
		expect(new UserEmail("Jotaro123@kujo.joestar17.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with a _',() =>{
		expect(new UserEmail("Jotaro_123@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with a -',() =>{
		expect(new UserEmail("Jotaro-123@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with a point in the username',() =>{
		expect(new UserEmail("Jotaro-1.2.3@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
	test('Should response a correct UserEmail instanced with more special characters',() =>{
		expect(new UserEmail("J%t#ro_1-2.3$@kujo.joestar.com")).toBeInstanceOf(UserEmail)
	})
})
