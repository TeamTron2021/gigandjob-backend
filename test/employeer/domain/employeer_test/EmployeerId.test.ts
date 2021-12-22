import EmptyEmployeerIdException from "../../../../domain/employeer/exceptions/employeer/EmptyIdEmployeerException";
import EmployeerId from "../../../../domain/employeer/value-objects/employeer/EmployeerId";
import UniqueId from "../../../../shared/domain/UniqueUUID";

describe('Testing EmployeerId value object',()=>{
    it('Should throw an Empty EmployeerId error', ()=>{
        const id: any = null; 
        expect(()=>EmployeerId.create(id)).toThrow(new EmptyEmployeerIdException(
            'El id del empleador no puede estar vacio'
        ))
    })
    it('Should throw an Empty EmployeerId error', ()=>{
        const id: any = '      '; 
        expect(()=>EmployeerId.create(id)).toThrow(new EmptyEmployeerIdException(
            'El id del empleador no puede estar vacio'
        ))
    })
    it('Should throw an Empty EmployeerId error', ()=>{
        const id: any = undefined; 
        expect(()=>EmployeerId.create(id)).toThrow(new EmptyEmployeerIdException(
            'El id del empleador no puede estar vacio'
        ))
    })
    it('should return a EmployeerID instance',()=>{
        const id = new UniqueId().getId();
        const employeerId = EmployeerId.create(id)
        const isEmployeerId = employeerId instanceof EmployeerId; 
        expect(isEmployeerId).toBe(true);
    })
})