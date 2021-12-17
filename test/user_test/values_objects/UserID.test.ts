import {randomUUID} from "crypto"
import {UserIdEmpty} from "../../../domain/user/errors/UserIdEmpty.error"
import {UserID} from "../../../domain/user/value_objects/UserID.value"

describe('Value Object UserID', () =>{
	test('Should response with error: UserIDEmpty',() =>{
		const id: any = null
		expect(() => new UserID(id)).toThrowError(new UserIdEmpty())
	})
	test('Should response with error: UserIdEmpty',() =>{
		expect(() => new UserID("")).toThrowError(new UserIdEmpty())
	})
	test('Should response a correct UserID',() =>{
		expect(new UserID(randomUUID())).toBeInstanceOf(UserID)
	})
})
