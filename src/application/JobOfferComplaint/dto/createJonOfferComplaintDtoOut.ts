export class CreateJobOfferComplaintDtoOut {
  constructor(
    public readonly Idcomplaint: string,
    public readonly issue: string,
    public readonly dateComplaint: Date,
    public readonly acceptedOrRejected: boolean,
  ) {}
}
