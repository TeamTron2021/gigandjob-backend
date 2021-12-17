import {UserFirstNameEmpty} from "../../../domain/user/errors/UserFirstNameEmpty.error"
import { UserFirstName } from "../../../domain/user/value_objects/UserFirstName.value"

describe('Value Object UserFirstName', () =>{
	test('Should response with error: UserFirstNameEmpty',() =>{
		const firstname: any = null
		expect(() => new UserFirstName(firstname)).toThrowError(new UserFirstNameEmpty())
	})
	test('Should response with error: UserFirstNameEmpty',() =>{
		expect(() => new UserFirstName("")).toThrowError(new UserFirstNameEmpty())
	})
	test('Should response a correct UserFirstName',() =>{
		expect(new UserFirstName("Jolyne")).toBeInstanceOf(UserFirstName)
	})
})
