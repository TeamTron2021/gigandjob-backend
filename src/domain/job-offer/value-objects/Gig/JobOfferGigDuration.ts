import { IValueObject } from '../../../../shared/domain/IValueObject';
import GigAmountInvalidException from '../../exceptions/Gig/GigAmountInvalidException';
import GigEmptyTimeException from '../../exceptions/Gig/GigEmptyTimeException';
import GigTimeInvalidException from '../../exceptions/Gig/GigTimeInvalidException';
import { Time } from '../../shared/Time.enum';

export default class GigDuration implements IValueObject {
  constructor(private readonly time: Time, private readonly amount: number) {}

  public equals(valueObject: GigDuration): boolean {
    return (
      this.time === valueObject.getTime() &&
      this.amount === valueObject.getAmount()
    );
  }

  public getTime() {
    return this.time;
  }
  public getAmount() {
    return this.amount;
  }

  public static create(time: Time, amount: number) {
    if (time == undefined || time == null) {
      throw new GigEmptyTimeException(
        'La unidad de tiempo de la duracion del gig no puede estar vacia',
      );
    }
    if (!(time in Time)) {
      throw new GigTimeInvalidException('El tiempo no es valido');
    }
    if (amount <= 0 || amount == undefined || amount == null) {
      throw new GigAmountInvalidException(
        'La cantidad de tiempo no puede ser 0 o negativa',
      );
    }

    return new GigDuration(time, amount);
  }
}
