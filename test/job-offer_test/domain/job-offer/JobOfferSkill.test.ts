import JobOfferEmptySkillException from "../../../../domain/job-offer/exceptions/JobOffer/JobOfferEmptySkillException";
import JobOfferSkill from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferSkill";

describe('Testing value object JobOfferSkill',()=>{
    it('Should thrown empty skill error',()=>{
        expect(() => JobOfferSkill.create('')).toThrow(new JobOfferEmptySkillException('La habilidad no puede estar vacia'));
    })
    it('Should thrown empty skill error',()=>{
        const skill:any = null;
        expect(() => JobOfferSkill.create(skill)).toThrow(new JobOfferEmptySkillException('La habilidad no puede estar vacia'));
    })
    it('Should return an instance of JobOfferSkill',()=>{
        const skill = 'Skill'; 
        const jobOfferSkill = JobOfferSkill.create(skill);
        const isSkill = jobOfferSkill instanceof JobOfferSkill;
        expect(isSkill).toBe(true);
    })
})