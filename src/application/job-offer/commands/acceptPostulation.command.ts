import UpdatePostulationStatus from "../ports/updatePostulationStatus.dto";

export class AcceptPostulationCommand {
    constructor(public readonly PostulationStatus: UpdatePostulationStatus) {}
}