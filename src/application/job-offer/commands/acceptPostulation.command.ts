import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";
import AcceptPostulationStatus from "../ports/AcceptPostulationStatus.dto";


export class AcceptPostulationCommand {
    constructor(public readonly Postulation: AcceptPostulationDto) {}
}