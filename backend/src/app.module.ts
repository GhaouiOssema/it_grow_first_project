import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { BlogModule } from './blog/blog.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ProjectModule } from './project/project.module';
import { ForgotPasswordController } from './forgot-password/forgot-password.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('SERVICE_PROVIDER'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('ADMIN_EMAIL')}>`,
        },
        template: {
          dir: join(
            __dirname,
            '..',
            configService.get<string>('TEMPLATES_DESTINATION_FOLDER'),
          ),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    AuthModule,
    UsersModule,
    MailModule,
    BlogModule,
    TestimonialsModule,
    ProjectModule,
  ],
  controllers: [AppController, ForgotPasswordController],
  providers: [AppService],
})
export class AppModule {}
