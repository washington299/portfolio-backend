export interface EmailSenderParams {
  email: string,
  subject: string,
  message: string,
}

export interface EmailSender {
  send(message: EmailSenderParams): Promise<boolean>;
}
