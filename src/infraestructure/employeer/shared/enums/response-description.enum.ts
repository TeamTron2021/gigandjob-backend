export enum ResponseDescription {
  OK = 'La peticion ha sido aceptada satisfactoriamente',
  CREATED = 'El recurso ha sido creado',
  BAD_REQUEST = 'La peticion no es valida',
  NOT_FOUND = 'No se encontro nada con ese id',
  UNAUTHORIZED = 'Parece que no esta autorizado para entrar a esta parte del sistema',
  INTERNAL_SERVER_ERROR = 'Parece que algo salio mal',
}
