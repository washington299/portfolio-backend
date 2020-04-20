export class ServerError extends Error {
  constructor() {
    super('Internal server error, send a message to this email: washingtoncampos9@gmail.com');
    this.name = 'ServerError';
  }
}
