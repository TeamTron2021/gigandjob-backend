
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'; 


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

}
