import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LaplaceControllerDomainService {
  constructor(private http: HttpClient) {}
  url = 'https://easycontroller.onrender.com/';
  // url = 'http://127.0.0.1:8000/';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };
  async calculaStepOne(data: any) {
    let queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');

    return await firstValueFrom(
      this.http.get(`${this.url}laplace/stepOne?${queryString}`, {
        headers: this.headers,
      })
    );
  }

  async calculaStepTwo(data: any) {
    let queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');

    return await firstValueFrom(
      this.http.get(`${this.url}laplace/stepTwo?${queryString}`, {
        headers: this.headers,
      })
    );
  }
}
