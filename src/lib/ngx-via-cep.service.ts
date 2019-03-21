import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxViaCepService {
  basePath = 'https://viacep.com.br/ws';
  urlFetchByCEP = (cep: string) => `${this.basePath}/${cep}/json/`;
  urlFetchByAddressSP = (
    address: string,
    state: string = 'SP',
    city: string = 'São Paulo'
  ) =>
    `${this.basePath}/${encodeURIComponent(state)}/${encodeURIComponent(
      city
    )}/${encodeURIComponent(address)}/json/`;

  constructor(private http: HttpClient) {}

  fetchByCEP(cep: string): Observable<any> {
    const subject = new Subject<HttpErrorResponse>();
    cep = cep.replace(/[!@#$%^&*a-zA-Z.-]/gi, '');

    if (/\d{8}/.test(cep)) {
      return this.http.get(this.urlFetchByCEP(cep));
    }

    subject.error(
      new HttpErrorResponse({
        status: 412,
        statusText: 'Precondition failed',
        error: { code: 1, message: 'length must be equals 8' }
      })
    );
    return subject.asObservable();
  }

  fetchByAddressSaoPaulo(address: string): Observable<any> {
    return this.http.get(this.urlFetchByAddressSP(address));
  }

  fetchByAddress(
    state: string,
    city: string,
    address: string
  ): Observable<any> {
    return this.http.get(this.urlFetchByAddressSP(address, state, city));
  }
}
