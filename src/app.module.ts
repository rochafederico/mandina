import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TelegramService } from './services/telegram/telegram.service';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import AiGenerativeService from './services/ai.generative/ai.generative.service';
import { WeatherService } from './services/weather/weather.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AiGenerativeService,
    TelegramService,
    WeatherService
  ],
})
export class AppModule { }
