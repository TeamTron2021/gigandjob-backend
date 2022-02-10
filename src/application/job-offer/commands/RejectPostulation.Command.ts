import RejectPostulationDto from "../ports/RejectPostulationStatus.dto";
import RejectPostulationStatus from "../ports/RejectPostulationStatus.dto";

export class RejectPostulationCommand {
    constructor(public readonly Postulation: RejectPostulationDto) {}
}