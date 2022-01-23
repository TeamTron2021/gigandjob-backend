
export class CreateJobOfferComplaintDto{
    constructor(
      public readonly issueDto: string,
      public readonly dateComplaintDto: Date,
      public readonly acceptedOrRejectedDto: boolean
    ){}

}