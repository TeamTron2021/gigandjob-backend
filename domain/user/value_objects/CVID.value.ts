import { IValueObject } from "../../../shared/domain/IValueObject";
import { CVIdEmpty } from "../errors/CVIDEmpty.error"



export default class CVID implements IValueObject {
	public constructor(readonly id: string) {}
  
	public equals(valueObject: CVID): boolean {
		return this.id === valueObject.id;
	}
  
	public getId() {
		return this.id;
	}
	
	public static create(id: string) {
  
		if(id == undefined || id == null || id  === '' || id === '  '){
			throw new CVIdEmpty();
		}
  
		return new CVID (id);
	}
  
  }
