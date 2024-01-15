import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import ResponseWeatherForecast from '../../domain/ResponseGetUpdates copy';
import Forecast from 'src/domain/Forecast';

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);
    private urlWeather: string;
    private te: string;
    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        const url = this.configService.get<string>('weather.url');
        const location = this.configService.get<string>('weather.location');
        const apikey = this.configService.get<string>('weather.apikey');

        const params = new URLSearchParams();
        params.append('location', location);
        params.append('apikey', apikey);

        this.urlWeather = `${url}?${params.toString()}`;
    }

    public async forecast(): Promise<Forecast> {
        const { data } = await firstValueFrom(
            this.httpService.get<ResponseWeatherForecast>(this.urlWeather)
        );
        const result = data.timelines.hourly[
            data.timelines.hourly.length - 1
        ];
        return result.values;
    }
}
