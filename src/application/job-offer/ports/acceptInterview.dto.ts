import IDto from "../../shared/interfaces/IDto";

export default abstract class AcceptInterviewDto extends IDto{
	id: string;
	status: string;
};