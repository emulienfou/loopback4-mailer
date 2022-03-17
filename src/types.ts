import * as Mail from 'nodemailer/lib/mailer';

export const MAILER_EXTENSION = 'mailer.extension';

export interface Mailer<T = any> {
  sendMail(mailOptions: Mail.Options): Promise<T>;
}
