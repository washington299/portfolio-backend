export interface EmailSending {
  send(email: string, subject: string, message: string): Promise<boolean>;
}
