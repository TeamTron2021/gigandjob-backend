import { CVStatus } from "../../../user/enums/CVStatus.enum"
import { UserStatus } from "../../../user/enums/UserStatus.enum"
import { User } from "../../../user/User.aggregate"
import JobOfferCreated from "../../domain-events/job-offer/JobOfferCreated.Event"
import JobOffer from "../../entities/JobOffer.aggregate"
import { JobOfferEmptyError } from "../../exceptions/postulation/JobOfferEmptyError"
import { UserEmptyValidate } from "../../exceptions/postulation/UserEmptyValidate"
import { OfferStatus } from "../../shared/OfferStatus.enum"
import JobOfferVacant from "../../value-objects/JobOffer/JobOfferVacant"

export const ValidateUserCanPostulate = (user: User<UserStatus>, jobOffer: JobOffer<OfferStatus>): boolean =>  {

    if(!user) {
        throw new UserEmptyValidate()
    }
    if (!jobOffer) {
        throw new JobOfferEmptyError()
    }
    
    if (user.status == UserStatus.Active) {
        if (jobOffer.vacant.getVacants() > 0) {
            if (jobOffer.status == OfferStatus.published) {
                return true
            }
        }
    }

    return false


}



// if (cv.status != CVStatus.Aproved) {
//     throw new Error ("CV status is invalid, the " + user.firstname + " cannot postulate")
// }

