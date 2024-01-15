import { Injectable } from '@nestjs/common';
import TelegramBot, { InlineKeyboardMarkup, Message } from 'node-telegram-bot-api';
import { DialogflowService } from '../dialogflow/dialogflow.service'; // Ajusta la ruta según tu estructura
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
    private bot: TelegramBot;

    constructor(
        private configService: ConfigService,
        private readonly dialogflowService: DialogflowService
    ) {
        const token = this.configService.get<string>('telegram.token');
        this.bot = new TelegramBot(token, { polling: true });

        this.bot.on('message', async (msg) => {
            switch (msg.chat.type) {
                case 'private':
                    await this.sendMessage(msg);
                    break;

                default:
                    break;
            }
        });
    }

    public async sendMessage(message: Message) {
        const chatId = message.chat.id;

        // Enviar el mensaje a Dialogflow y obtener la respuesta
        const dialogflowResponse = await this.dialogflowService.sendMessageToDialogflow(message.text);

        // Enviar la respuesta de Dialogflow al chat de Telegram
        // if (botones.length > 0) {
        //     const options = {
        //         reply_markup: {
        //             keyboard: botones.map((button) => [{ text: button }]),
        //             resize_keyboard: true,
        //             one_time_keyboard: true,
        //         },
        //     };
        //     this.bot.sendMessage(chatId, dialogflowResponse, options);
        // } else {
        this.bot.sendMessage(chatId, dialogflowResponse);
        // }
    }

}