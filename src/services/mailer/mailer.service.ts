import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly sendGrid: SendGridService) {}
  async sendWelcomeEmail(to: string) {
    return this.sendGrid.send({
      to,
      from: 'kidmortal2@gmail.com',
      subject: 'Welcome to goblins merchant',
      text: 'Suit yourself.',
      html: 'we love <strong>YOU</strong>',
    });
  }
  async sendCustomStringMessage(to: string, title: string, message: string) {
    return this.sendGrid.send({
      to,
      from: 'kidmortal2@gmail.com',
      subject: title,
      text: message,
    });
  }
  async sendCustomHTMLMessage(to: string, title: string, HTML: string) {
    return this.sendGrid.send({
      to,
      from: 'kidmortal2@gmail.com',
      subject: title,
      html: HTML,
    });
  }
}
