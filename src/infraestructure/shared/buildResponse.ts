import { HttpStatus } from '@nestjs/common';

export const buildResponse = (status: HttpStatus, message: any) => {
  return {
    status: status,
    message: message,
  };
};
