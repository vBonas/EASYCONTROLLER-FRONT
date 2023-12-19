import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TimeControllerDomainService {
  constructor(private http: HttpClient) {}
  url = 'https://easycontroller.onrender.com/easy-controller';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };
  async calcStep(data: any) {
    return await firstValueFrom(
      this.http.post(`${this.url}/`, data, { headers: this.headers })
    );
  }

  async calc_lqr(data: any) {
    return await firstValueFrom(
      this.http.post(`${this.url}/lqr`, data, { headers: this.headers })
    );
  }

  async calc_lqi(data: any) {
    return await firstValueFrom(
      this.http.post(`${this.url}/lqi`, data, { headers: this.headers })
    );
  }

  async calc_lqg(data: any) {
    return await firstValueFrom(
      this.http.post(
        `${this.url}/lqg`,

        data,
        { headers: this.headers }
      )
    );
  }

  async calc_lqgi(data: any) {
    return await firstValueFrom(
      this.http.post(
        `${this.url}/lqgi`,

        data,
        { headers: this.headers }
      )
    );
  }
}
