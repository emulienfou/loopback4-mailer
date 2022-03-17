import {BindingScope, config, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {Mailer} from '../types';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import {SESClient, SESClientConfig, SendRawEmailCommand} from '@aws-sdk/client-ses';
import {NodemailerBindings, SESBindings} from '../keys';
import {debug} from '../components';

@injectable({ scope: BindingScope.TRANSIENT })
export class MailerService implements Mailer {
  transporter: nodemailer.Transporter;

  constructor(
    @config({fromBinding: NodemailerBindings.Config})
      nodemailerConfig?: SMTPTransport.Options,
    @config({fromBinding: SESBindings.Config})
      sesConfig?: SESClientConfig,
  ) {
    debug('Initialize MailerService');
    if (nodemailerConfig) {
      debug(nodemailerConfig);
      this.transporter = nodemailer.createTransport(nodemailerConfig);
    } else if (sesConfig) {
      debug(sesConfig);
      this.transporter = nodemailer.createTransport({
        SES: {
          ses: new SESClient(sesConfig),
          aws: { SendRawEmailCommand }
        }
      });
    } else {
      throw new HttpErrors.PreconditionFailed('Mailer config missing !');
    }
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<any> {
    debug('Sending mail');
    const response = await this.transporter.sendMail(mailOptions);
    debug(response);

    return response
  }
}
