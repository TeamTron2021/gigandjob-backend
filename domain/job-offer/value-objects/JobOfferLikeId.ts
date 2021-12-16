import { ValueObject } from "../../../shared/ValueObject";

interface IDProps {
    value: string;
  }
  
  export class ID extends ValueObject<IDProps> {
    private constructor(props: IDProps) {
      super(props);
    }
  
    get value(): string {
      return this.props.value;
    }
  
    public static create(value: string): ID {
      return new ID({ value: value });
    }
  // Tal vez debe ir en shared porque es general para los ID
  }