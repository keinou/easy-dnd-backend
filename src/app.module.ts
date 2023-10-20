import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './auth/entities/auth.entity';
import { CharacterModule } from './character/character.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemsModule } from './items/items.module';
import { RaceModule } from './race/race.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    CharacterModule,
    ItemsModule,
    InventoryModule,
    RaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
