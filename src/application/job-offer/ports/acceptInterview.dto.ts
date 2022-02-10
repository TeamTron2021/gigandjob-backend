import IDto from "../../shared/interfaces/IDto";
import PostulationFound from "./findPostulationResult.dto";

export default class AcceptInterviewDto extends IDto{
	id: string;
	status: string;
	
	// Asociaciones con otras entidades:
	postulation: PostulationFound; // Para buscar la postulación a la que pertenece.
	// jobOffer: string; // Para buscar la oferta de trabajo a la que pertenece la postulación.
	
	// ATENCIÓN:
	// El código no expresa que una oferta de trabajo esté compuesta de postulaciones. Por lo que no se puede obtener una
	// oferta de trabajo, usando el ID de la postulación a la que pertenece la entrevista a aceptar.
	
};