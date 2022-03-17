# loopback4-mailer

This is a loopback-next extension for adding mailer service to any loopback 4 based REST API application or
microservice.

## Stability: ⚠️Experimental⚠️

> Experimental packages provide early access to advanced or experimental
> functionality to get community feedback. Such modules are published to npm
> using `0.x.y` versions. Their APIs and functionality may be subject to
> breaking changes in future releases.

## Installation

```sh
npm install --save loopback4-mailer
```

## Basic use

### Configuration

In order to use this component into your LoopBack application, please follow below steps.

Add component to application.

```ts
import {MailerComponent} from 'loopback4-mailer';

export class MyApplication extends Application {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    this.component(MailerComponent);
  }
}
```

After the above, you need to configure one of the nodemailer transports.   
Based upon the requirement, please choose and configure the respective transport mailer. See below.

#### SMTP transport

To use the default SMTP transport from nodemailer, you will need to configure the next binding:

```ts
import {NodemailerBindings} from 'loopback4-mailer';

this.configure(NodemailerBindings.Config).to( {
  host: String(process.env.EMAIL_SMTP_HOST),
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: Boolean(process.env.EMAIL_SMTP_SECURE),
  auth: {
    user: String(process.env.EMAIL_SMTP_USER),
    pass: String(process.env.EMAIL_SMTP_PASSWORD)
  }
});
```

#### SES transport

To use the built-in Amazon SES transport from nodemailer, you need to configure the next binding:

```ts
import {SESBindings} from 'loopback4-mailer';

this.configure(SESBindings.Config).to({
  credentials: {
    accessKeyId: String(process.env.SES_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.SES_SECRET_ACCESS_KEY)
  },
  region: process.env.SES_REGION,
});
```

### Usage

Once the configuration is set, the implementation of the mailer is very easy. Just import the `MailerService` and use
the `sendMail` function to send and email, as demonstrate bellow:

```ts
import {service} from '@loopback/core';
import {MailerService} from 'loopback4-mailer';
import {get} from '@loopback/rest';

export class MailerController {
  constructor(@service(MailerService) protected mailerService: MailerService) {
  }

  @get('/email/send')
  async send() {
    return this.mailerService.sendMail({
      from: 'example@example.com',
      to: 'example@example.com',
      text: 'example'
    })
  }
}
```

## Debug

To display debug messages from this package, you can use the next command:

```shell
DEBUG=loopback:mailer npm run start
```

## Tests

Run `npm test` from the root folder.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the [MIT](LICENSE.md)
