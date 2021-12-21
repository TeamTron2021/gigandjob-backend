import { UserStatus } from "../../../../user/enums/UserStatus.enum";
import { User } from "../../../../user/User.aggregate";
import { Postulation } from "../postulation";
import { PostulationStatus } from "../value-objects/PostulationStatus";

export const ValidateUserCanPostulate = (user: User<UserStatus>, postulation: Postulation<PostulationStatus>): void =>  {

    if(!user) {
        throw new Error("User is empty")
    }
    if (!postulation) {
        throw new Error("Postulation is empty")
    }

    if (user.status = UserStatus.Active) {
        
    } 


}