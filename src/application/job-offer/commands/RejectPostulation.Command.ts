import RejectPostulationStatus from "../ports/RejectPostulationStatus.dto";

export class RejectPostulationCommand {
    constructor(public readonly PostulationStatus: RejectPostulationStatus) {}
}