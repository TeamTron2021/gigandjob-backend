import { PostulationUUIDError } from '../../exceptions/postulation/PostulationUUIDError';

export class PostulationUUID {
  private readonly value: string;

  constructor(value: string) {
    if (!value || !value.trim()) throw new PostulationUUIDError();
    this.value = value;
  }

  get idPostulation(): string {
    return this.value;
  }

  
  public static create(id: string) {
    

    return new PostulationUUID(id);
  }
}
