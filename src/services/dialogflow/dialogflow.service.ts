import { Injectable } from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DialogflowService {
  private dialogflowClient: SessionsClient;

  constructor(
    private configService: ConfigService
  ) {
    const keyFilename = this.configService.get<string>('dialogflow.keyFilename');

    // Configurar el cliente de Dialogflow con tus credenciales desde las variables de entorno
    this.dialogflowClient = new SessionsClient({
      keyFilename,
    });
  }

  public async sendMessageToDialogflow(messageText: string): Promise<string> {
    const sessionPath = this.dialogflowClient.sessionPath('YOUR_PROJECT_ID', 'YOUR_SESSION_ID');

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: messageText,
          languageCode: 'es', // Idioma
        },
      },
    };

    const responses = await this.dialogflowClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  }

  // ...otros métodos relacionados con Dialogflow
}