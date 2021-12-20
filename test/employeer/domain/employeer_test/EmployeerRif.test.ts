import EmployeerEmptyRifException from "../../../../domain/employeer/exceptions/employeer/EmployeerEmptyRifException";
import EmployeerInvalidRifException from "../../../../domain/employeer/exceptions/employeer/EmployeerInvalidRifException";
import EmployeerRif from "../../../../domain/employeer/value-objects/employeer/EmployeerRif";

describe('Testing EmployeerRif value object',()=>{
    it('Should throw an empty rif error',()=>{
        const rif:any = undefined; 
        expect(()=>EmployeerRif.create(rif)).toThrow(new EmployeerEmptyRifException(
            'El rif no puede estar vacio'
        ))
    })
    it('Should throw an empty rif error',()=>{
        const rif:any = null; 
        expect(()=>EmployeerRif.create(rif)).toThrow(new EmployeerEmptyRifException(
            'El rif no puede estar vacio'
        ))
    })
    it('Should throw an empty rif error',()=>{
        const rif:any = '      '; 
        expect(()=>EmployeerRif.create(rif)).toThrow(new EmployeerInvalidRifException(
            'El rif introducido no es valido'
        ))
    })
    it('Should throw an empty rif error',()=>{
        const rif:any = 90; 
        expect(()=>EmployeerRif.create(rif)).toThrow(new EmployeerInvalidRifException(
            'El rif introducido no es valido'
        ))
    })
    it('Should throw an empty rif error',()=>{
        const rif:any = 'J-888383838383'; 
        expect(()=>EmployeerRif.create(rif)).toThrow(new EmployeerInvalidRifException(
            'El rif introducido no es valido'
        ))
    })
    it('Should return an employeerRif instance',()=>{
        const rif:any = 'J-27784169-4';
        const employeerRif = EmployeerRif.create(rif); 
        const isEmployeerRif = employeerRif instanceof EmployeerRif;
        expect(isEmployeerRif).toBe(true);
    })

})