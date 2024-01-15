import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, reduce } from 'rxjs';
import { google } from 'googleapis';
import * as mandina from '../../config/mandina-b363edc002cd.json';

@Injectable()
export default class AiGenerativeService {
    private readonly logger = new Logger(AiGenerativeService.name);
    private url: string;
    private key: string;
    private accessToken: string;
    private projectId: string;
    private sessionClient: any; // Definir el tipo correcto
    private languageCode: string;
    private region: string;

    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.url = this.configService.get<string>('ai.generative.url');
        this.key = this.configService.get<string>('ai.generative.key');
        this.accessToken = '';
        this.projectId = mandina.project_id;
        this.sessionClient = new google.auth.JWT(
            mandina.client_email,
            null,
            mandina.private_key,
            ['https://www.googleapis.com/auth/cloud-platform']
        );

        this.languageCode = 'es';
        this.region = 'us-east1';
        // /projects/mandina/locations/us-east1/agents/854e2b08-4fa5-4f13-ba7e-83764a868cff/environments/8c299faa-29c8-4e94-94be-184e998481b3
    }

    async getResponseChat(text: string, data: Record<string, any> = {}) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }
        return this.generateResponse(text, data);
    }

    private async getAccessToken() {
        const auth = await this.sessionClient.authorize(); // Solicita la autorización
        if (auth && auth.access_token) {
            this.accessToken = auth.access_token; // Almacena el token de acceso
        }
    }

    private async generateResponse(text: string, data: Record<string, any> = {}, count: number = 1): Promise<string> {
        let resultado = "No entendí ";
        try {
            const params = new URLSearchParams();
            params.append('key', this.key);

            const dialogflowData = { ...data, text };
            const response = await this.detectIntent(dialogflowData);

            if (response) {
                resultado = response;
            }
        } catch (error) {
            this.logger.error(error);
            if (count < 4) {
                resultado = await this.generateResponse(text, data, count + 1);
            }
        }

        return resultado;
    }

    private async detectIntent(data: Record<string, any>) {
        const request = {
            queryInput: {
                languageCode: this.languageCode,
                text: {
                    text: data.text,
                    languageCode: this.languageCode,
                },
            }
        };

        const headers = { 'Authorization': `Bearer ${this.accessToken}` };

        const response$ = this.httpService.post(
            this.urlDetectIntent,
            request,
            { headers }
        );

        const response = await firstValueFrom(response$);

        return response.data.queryResult.responseMessages
            .map(message => message.text.text)
            .reduce((accumulator, currentText) => {
                if (accumulator) {
                    return `${accumulator}\n${currentText}`;
                } else {
                    return currentText;
                }
            }, '');
    }

    private get session() {
        return `123456`;
    }
    private get urlDetectIntent() {
        return `https://${this.region}-${this.url}/v3/projects/mandina/locations/us-east1/agents/854e2b08-4fa5-4f13-ba7e-83764a868cff/environments/8c299faa-29c8-4e94-94be-184e998481b3/sessions/${this.session}:detectIntent`;
    }
}
