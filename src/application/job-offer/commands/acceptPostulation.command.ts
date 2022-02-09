import AcceptPostulationStatus from "../ports/AcceptPostulationStatus.dto";


export class AcceptPostulationCommand {
    constructor(public readonly PostulationStatus: AcceptPostulationStatus) {}
}