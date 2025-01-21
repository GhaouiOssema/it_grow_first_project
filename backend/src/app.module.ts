import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ForgotPasswordController } from './forgot-password/forgot-password.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BlogModule } from './blog/blog.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.VERCEL_MONGO_URI),
    AuthModule,
    UsersModule,
    MailerModule.forRoot({
      transport: {
        service: process.env.VERCEL_SERVICE_PROVIDER,
        auth: {
          user: process.env.VERCEL_SMTP_USER,
          pass: process.env.VERCEL_SMTP_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.VERCEL_ADMIN_EMAIL}>`,
      },
      template: {
        dir: join(
          __dirname,
          '..',
          process.env.VERCEL_TEMPLATES_DESTINATION_FOLDER,
        ),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        process.env.VERCEL_UPLOAD_DESTINATION_FOLDER,
      ),
      serveRoot: `/${process.env.VERCEL_TEMPLATES_DESTINATION_FOLDER}`,
    }),
    MailModule,
    BlogModule,
    TestimonialsModule,
    ProjectModule,
  ],
  controllers: [AppController, ForgotPasswordController],
  providers: [AppService],
})
export class AppModule {}
