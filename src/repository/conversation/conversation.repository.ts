import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export default class AiGenerativeService {
    private readonly logger = new Logger(AiGenerativeService.name);
    private url: string;
    private key: string;

    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.url = this.configService.get<string>('ai.generative.url');
        this.key = this.configService.get<string>('ai.generative.key');
    }

}
