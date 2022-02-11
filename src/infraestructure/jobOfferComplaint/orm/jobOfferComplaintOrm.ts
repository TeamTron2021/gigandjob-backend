
import { JobOfferORM } from '../../../infraestructure/job-offer/orm/job-offer.orm';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'; 


@Entity('joboffercomplaint')
export class joboffercomplaintSchema {
    @PrimaryGeneratedColumn("uuid")    
    idjoboffercomplaint: string;

    @Column({ default: '' })    
    issue: string;
    
    @Column({ type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP' })    
    date: Date;

     
    @Column({ default: false, nullable: true })
    acceptedorrejected: boolean;

    @ManyToOne(() => JobOfferORM, (JobOfferORM) => JobOfferORM.complaint, {nullable: true})
    JobOffer: JobOfferORM;

}
