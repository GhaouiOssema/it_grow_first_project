import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure ConfigModule is global
      envFilePath: '.env', // Specify .env file path
    }),
    MongooseModule.forRoot(
      'mongodb+srv://oghawi220:TnoasdnPigaXyP8X@cluster0.wi6bhd8.mongodb.net/nest',
    ), // Use DATABASE_URI environment variable
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
