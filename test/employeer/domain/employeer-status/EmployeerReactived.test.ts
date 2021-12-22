import Employeer from "../../../../domain/employeer/entities/Employeer.aggregate"
import { EmployeerStatus } from "../../../../domain/employeer/shared/EmployeerStatus.enum"
import EmployeerCompanyMail from "../../../../domain/employeer/value-objects/employeer/EmployeerCompanyMail"
import EmployeerCompanyName from "../../../../domain/employeer/value-objects/employeer/EmployeerCompanyName"
import EmployeerId from "../../../../domain/employeer/value-objects/employeer/EmployeerId"
import EmployeerIndustry from "../../../../domain/employeer/value-objects/employeer/EmployeerIndustry"
import EmployeerLocalization from "../../../../domain/employeer/value-objects/employeer/EmployeerLocalization"
import EmployeerRif from "../../../../domain/employeer/value-objects/employeer/EmployeerRif"
import UniqueId from "../../../../shared/domain/UniqueUUID"

describe('Testing employeer creation', ()=>{
    it('Should return an Employeer instance ', ()=>{
        const id = EmployeerId.create(new UniqueId().getId());
        const latitude:any = '+90.0, -127.554334'; 
        const longitude:any = '47.1231231, 179.99999999'; 
        const employeerLocalization = EmployeerLocalization.create(latitude, longitude); 
        const employeer = Employeer.create(
            new EmployeerCompanyMail('empresasPolar@polar.com'), 
            new EmployeerCompanyName('Empresas Polar'), 
            id,
            new EmployeerIndustry('Alimentos'),
            new EmployeerRif('J-27784169-4'), 
            employeerLocalization
        ); 
        expect(employeer).toBeInstanceOf(Employeer);
    }); 
    it('Should update the employeer status', ()=>{
        const id = EmployeerId.create(new UniqueId().getId());
        const latitude:any = '+90.0, -127.554334'; 
        const longitude:any = '47.1231231, 179.99999999'; 
        const employeerLocalization = EmployeerLocalization.create(latitude, longitude); 
        const employeer = Employeer.create(
            new EmployeerCompanyMail('empresasPolar@polar.com'), 
            new EmployeerCompanyName('Empresas Polar'), 
            id,
            new EmployeerIndustry('Alimentos'),
            new EmployeerRif('J-27784169-4'), 
            employeerLocalization
        ); 
        expect(employeer.status).toBe(EmployeerStatus.NOT_SUSPENDED);

        //expect(employeer.reactiveEmployeer().status).toBe(EmployeerStatus.SUSPENDED);
    });

})