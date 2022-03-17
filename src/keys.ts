import {BindingKey} from '@loopback/core';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import {SESClientConfig} from '@aws-sdk/client-ses';
import {MailerComponent} from './components';

export namespace MailerBindings {
  export const COMPONENT = BindingKey.create<MailerComponent>(
    'mailer.MailerComponent'
  );
}

export namespace NodemailerBindings {
  /**
   * A sample config looks like
   * pool: true,
   *  maxConnections: 100,
   *  url:"",
   *  host: "smtp.example.com",
   *  port: 80,
   *  secure: false,
   *  auth: {
   *   user: "username",
   *   pass: "password"
   *  },
   *  tls: {
   *    // do not fail on invalid certs
   *    rejectUnauthorized: true
   *   }
   */
  export const Config = BindingKey.create<SMTPTransport.Options | null>(
    'mailer.config.nodemailer',
  );
}

export namespace SESBindings {
  export const Config = BindingKey.create<SESClientConfig | null>(
    'mailer.config.ses',
  );
}
