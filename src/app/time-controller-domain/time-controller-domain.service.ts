import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TimeControllerDomainService {
  constructor(private http: HttpClient) {}
  url = 'http://almir.pythonanywhere.com/appview/easy-controller/';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };
  async calcStep(data: any) {
    return await firstValueFrom(
      this.http.post(this.url, data, { headers: this.headers })
    );
  }

  async calc_lqr(data: any) {
    return await firstValueFrom(
      this.http.post(
        'http://almir.pythonanywhere.com/appview/easy-controller/lqr',
        data,
        { headers: this.headers }
      )
    );
  }

  async calc_lqi(data: any) {
    return await firstValueFrom(
      this.http.post(
        'http://almir.pythonanywhere.com/appview/easy-controller/lqi',
        data,
        { headers: this.headers }
      )
    );
  }

  async calc_lqg(data: any) {
    return await firstValueFrom(
      this.http.post(
        'http://almir.pythonanywhere.com/appview/easy-controller/lqg',
        data,
        { headers: this.headers }
      )
    );
  }

  async calc_lqgi(data: any) {
    return await firstValueFrom(
      this.http.post(
        'http://almir.pythonanywhere.com/appview/easy-controller/lqgi',
        data,
        { headers: this.headers }
      )
    );
  }
}
