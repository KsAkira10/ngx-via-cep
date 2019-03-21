import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxViaCepConfiguration } from './ngx-via-cep.configuration';
import { BASE_PATH } from './ngx-via-cep.variables';

@Injectable()
export class NgxViaCepService {
  protected basePath = 'https://viacep.com.br/ws';
  public defaultHeaders = new HttpHeaders();
  public configuration = new NgxViaCepConfiguration();
  private readonly urlFetchByCEP = (cep: string) =>
    `${this.basePath}/${cep}/json/`;
  private readonly urlFetchByAddressSP = (
    address: string,
    state: string = 'SP',
    city: string = 'São Paulo'
  ) =>
    `${this.basePath}/${encodeURIComponent(state)}/${encodeURIComponent(
      city
    )}/${encodeURIComponent(address)}/json/`;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: NgxViaCepConfiguration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public fetchByCEP = (cep: string): Observable<any> => {
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
  };

  public fetchByAddressSaoPaulo = (address: string): Observable<any> => {
    return this.http.get(this.urlFetchByAddressSP(address));
  };

  public fetchByAddress = (
    state: string,
    city: string,
    address: string
  ): Observable<any> => {
    return this.http.get(this.urlFetchByAddressSP(address, state, city));
  };
}
