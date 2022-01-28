
export class CreateJobOfferComplaintDtoIn{
    constructor(
      public readonly issueDto: string,
      public readonly dateComplaintDto: Date,
      public readonly acceptedOrRejectedDto: boolean
    ){}

}