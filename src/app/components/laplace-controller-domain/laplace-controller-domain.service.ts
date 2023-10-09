import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LaplaceControllerDomainService {
  constructor(private http: HttpClient) {}
  url = 'http://127.0.0.1:8000/';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
  };
  async calculaStepOne(data: any) {
    let queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');

    return await firstValueFrom(
      this.http.get(`${this.url}modelo/chamadas/dadosgrafico?${queryString}`)
    );
  }

  async calculaStepTwo(data: any) {
    let queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');

    return await firstValueFrom(
      this.http.get(`${this.url}modelo/chamadas2/dadosgrafico2?${queryString}`)
    );
  }
}
