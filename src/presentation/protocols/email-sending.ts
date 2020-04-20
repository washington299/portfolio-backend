export interface EmailSendingParams {
  email: string,
  subject: string,
  message: string,
}

export interface EmailSending {
  send(message: EmailSendingParams): Promise<EmailSendingParams>;
}
