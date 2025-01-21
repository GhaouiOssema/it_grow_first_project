import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface MailData {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const { name, email, subject, message } = data;
    try {
      await this.mailerService.sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        template: 'contact-to-admin',
        context: { name, email, subject, message },
      });

      await this.mailerService
        .sendMail({
          to: email,
          subject: 'Thank you for contacting us!',
          template: 'contact-to-client',
          context: { name, email, subject, message },
        })
        .then(() => {
          console.log('Client email sent');
        })
        .catch((error) => {
          console.error('Error sending client email:', error);
        });

      console.log('Both emails sent successfully');
    } catch (error) {
      console.error('Failed to send emails:', error);
      throw new Error('Failed to send emails');
    }
  }
}
