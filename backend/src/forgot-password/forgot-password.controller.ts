import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from 'src/users/dto/forgot-password.dto/forgot-password.dto';
import { ResetPasswordDto } from 'src/users/dto/forgot-password.dto/ResetPasswordDto';

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

    // Set expiration time for 5 minutes
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    const resetToken = this.usersService.generateResetToken();

    // Store reset token and expiration time
    await this.usersService.updateResetToken(
      user.id,
      resetToken,
      expirationTime,
    );

    const resetLink = `${process.env.FORGOT_PASSWORD_REDIRECTION_URL}/reset-password?token=${resetToken}&expires=${expirationTime}`;

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
      console.log(error);
      throw new BadRequestException('Failed to send reset email.');
    }

    return { exists: true };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, password, expires } = resetPasswordDto;

    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    if (Date.now() > expires) {
      throw new BadRequestException('Reset token has expired.');
    }

    await this.usersService.updatePassword(user.id, password);

    await this.usersService.updateResetToken(user.id, null, null);

    return { message: 'Password reset successfully.' };
  }
}
