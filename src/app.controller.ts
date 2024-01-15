import { Controller, Post } from '@nestjs/common';
import { TelegramService } from './services/telegram/telegram.service';

@Controller()
export class AppController {
  constructor(private readonly telegramService: TelegramService) { }

  @Post()
  sendMessage(): string {
    return 'this.telegramService.sendMessage()';
  }
}
