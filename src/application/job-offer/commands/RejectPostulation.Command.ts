import UpdatePostulationStatus from "../ports/updatePostulationStatus.dto";

export class RejectPostulationCommand {
    constructor(public readonly PostulationStatus: UpdatePostulationStatus) {}
}