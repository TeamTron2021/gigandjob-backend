import { UserStatus } from "../../../user/enums/UserStatus.enum"
import { User } from "../../../user/User.aggregate"
import JobOffer from "../../entities/JobOffer.aggregate"
import { JobOfferEmptyError } from "../../exceptions/postulation/JobOfferEmptyError"
import { UserEmptyValidate } from "../../exceptions/postulation/UserEmptyValidate"
import { OfferStatus } from "../../shared/OfferStatus.enum"

export const ValidateUserCanPostulate = (user: User<UserStatus>, jobOffer: JobOffer<OfferStatus>): boolean =>  {

    if(!user) {
        throw new UserEmptyValidate()
    }
    if (!jobOffer) {
        throw new JobOfferEmptyError()
    }

    if (user.status = UserStatus.Active) {
        return true
    } 

    return false 
}