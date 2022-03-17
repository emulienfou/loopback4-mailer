import {Binding, BindingScope, Component, ContextTags, createServiceBinding, extensionPoint} from '@loopback/core'
import {MailerService} from '../services';
import {MailerBindings} from '../keys';
import {MAILER_EXTENSION} from '../types';
import debugFactory from 'debug';

export const debug = debugFactory('loopback:mailer');

@extensionPoint(MAILER_EXTENSION, {
  tags: {[ContextTags.KEY]: MailerBindings.COMPONENT},
  scope: BindingScope.SINGLETON,
})
export class MailerComponent implements Component {
  bindings?: Binding[] = [
    createServiceBinding(MailerService),
  ]
}
