import { CVIdEmpty } from '../errors/CVIDEmpty.error';

export default class CVID {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getId() {
    return this.value;
  }

  public static create(id: string) {
    if (id == undefined || id == null || id === '' || id === '  ') {
      throw new CVIdEmpty();
    }

    return new CVID(id);
  }
}
