import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from 'src/users/dto/forgot-password.dto/forgot-password.dto';

@Controller('account')
export class ForgotPasswordController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { exists: false };
    }

    // Generate reset token and save it
    const resetToken = this.usersService.generateResetToken();
    await this.usersService.updateResetToken(user.id, resetToken);

    // Construct reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        template: './reset-password',
        context: {
          name: user.username,
          resetLink,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to send reset email.');
    }

    return { exists: true };
  }
}
