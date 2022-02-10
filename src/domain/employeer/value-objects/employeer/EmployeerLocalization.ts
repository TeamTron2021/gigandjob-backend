import { IValueObject } from '../../../../shared/domain/IValueObject';
import EmployeerEmptyLocalizationException from '../../exceptions/employeer/EmployeerEmptyLocalizationException';
import EmployeerInvalidLocalizationException from '../../exceptions/employeer/EmployeerInvalidLocalizationException';

const REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/;

export default class EmployeerLocalization implements IValueObject {
  constructor(
    private readonly latitude: string,
    private readonly longitude: string,
  ) {}

  public equals(valueObject: EmployeerLocalization): boolean {
    return (
      this.longitude === valueObject.getLongitude() &&
      this.latitude === valueObject.getLatitude()
    );
  }

  public getLongitude() {
    return this.longitude;
  }

  public getLatitude() {
    return this.latitude;
  }

  public static create(latitude: string, longitude: string) {
    if (latitude == undefined || latitude == null) {
      throw new EmployeerEmptyLocalizationException(
        'La latitud no debe estar vacia',
      );
    }
    if (longitude == undefined || longitude == null) {
      throw new EmployeerEmptyLocalizationException(
        'La longitud no debe estar vacia',
      );
    }
    if (typeof latitude != 'string' || typeof longitude != 'string') {
      throw new EmployeerInvalidLocalizationException(
        'Los campos de la localizacion deben ser string',
      );
    }
    if (!longitude.trim()) {
      throw new EmployeerEmptyLocalizationException(
        'La longitud no debe estar vacia',
      );
    }

    if (!latitude.trim()) {
      throw new EmployeerEmptyLocalizationException(
        'La latitud no debe estar vacia',
      );
    }

    if (!latitude.match(REGEX)) {
      throw new EmployeerInvalidLocalizationException(
        'Las coordenadas de la latitud son invalidas',
      );
    }

    if (!longitude.match(REGEX)) {
      throw new EmployeerInvalidLocalizationException(
        'Las coordenadas de la latitud son invalidas',
      );
    }

    return new EmployeerLocalization(latitude, longitude);
  }
}
