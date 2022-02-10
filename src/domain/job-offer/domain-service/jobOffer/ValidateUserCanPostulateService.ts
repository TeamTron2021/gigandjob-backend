import { CVStatus } from '../../../user/enums/CVStatus.enum';
import { UserStatus } from '../../../user/enums/UserStatus.enum';
import { User } from '../../../user/User.aggregate';
import JobOffer from '../../entities/JobOffer.aggregate';
import { JobOfferEmptyError } from '../../exceptions/postulation/JobOfferEmptyError';
import { UserEmptyValidate } from '../../exceptions/postulation/UserEmptyValidate';
import { OfferStatus } from '../../shared/OfferStatus.enum';

export const ValidateUserCanPostulate = (
  user: User<UserStatus> | undefined,
  jobOffer: JobOffer<OfferStatus>,
): boolean => {
  if (!user) {
    throw new UserEmptyValidate();
  }
  if (!jobOffer) {
    throw new JobOfferEmptyError();
  }

  if (user.status == UserStatus.Active) {
    if (user.cv) {
      if ((user.cv.status = CVStatus.Aproved)) {
        if (jobOffer.status == OfferStatus.published) {
          return true;
        }
      }
    }
  }

  return false;
};
