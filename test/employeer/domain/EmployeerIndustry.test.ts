import EmployeerEmptyIndustryException from "../../../domain/employeer/exceptions/employeer/EmployeerEmptyIndustryException";
import EmployeerInvalidIndustryException from "../../../domain/employeer/exceptions/employeer/EmployeerInvalidIndustryException";
import EmployeerIndustry from "../../../domain/employeer/value-objects/employeer/EmployeerIndustry";

describe('Testing employeerIndustry value object',()=>{
    it('Should throw an empty Industry error ', ()=>{
        const industry: any = null ; 
        expect(()=>EmployeerIndustry.create(industry)).toThrow(new EmployeerEmptyIndustryException('La industria no puede estar vacia'));
    })
    it('Should throw an empty Industry error ', ()=>{
        const industry: any = undefined ; 
        expect(()=>EmployeerIndustry.create(industry)).toThrow(new EmployeerEmptyIndustryException('La industria no puede estar vacia'));
    })
    it('Should throw an empty Industry error ', ()=>{
        const industry: any = ' '; 
        expect(()=>EmployeerIndustry.create(industry)).toThrow(new EmployeerEmptyIndustryException('La industria no puede estar vacia'));
    })
    it('Should throw an empty Industry error ', ()=>{
        const industry: any = 9 ; 
        expect(()=>EmployeerIndustry.create(industry)).toThrow(new EmployeerInvalidIndustryException('La industria tiene que ser un string'));
    }); 
    it('Should return an EmployeerIndustry instance',()=>{
        const industry ='alimentos'; 
        const employeerIndustry = EmployeerIndustry.create(industry); 
        const isIndustry = employeerIndustry instanceof EmployeerIndustry;
        expect(isIndustry).toBe(true)
    })
})