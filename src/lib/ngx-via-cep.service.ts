import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(this.urlFetchByCEP(cep));
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
