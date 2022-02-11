export class UpdateJobOfferComplaintDtoIn {
  constructor(
    public readonly issue: string,
    public readonly dateComplaint: Date,
    public readonly acceptedOrRejected: boolean,
  ) {}
}
