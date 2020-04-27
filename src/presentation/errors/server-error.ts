export class ServerError extends Error {
  constructor() {
    super('Internal server error,if you want to contact me please send a message to this email: washingtoncampos9@gmail.com');
    this.name = 'ServerError';
  }
}
