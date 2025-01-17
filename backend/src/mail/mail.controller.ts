import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

interface ContactFormDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async sendContactForm(@Body() body: ContactFormDto) {
    await this.mailService.sendContactForm(body);

    return {
      success: true,
      message: 'Emails sent successfully!',
    };
  }
}
