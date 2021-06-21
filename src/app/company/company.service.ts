import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log('[SERVICE] tap', x)),
        catchError(error => this.errorHandler<Company[]>(error)),
        finalize(() => console.log('FINALIZE'))
      );

    // return [
    //   { name: 'Company 1', email: 'Email  1', phone: 1111 },
    //   { name: 'Company 2', email: 'Email  2', phone: 2222 },
    // ];
  }

  public deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('ERROR', error);
    return new Observable<T>();
  }
}
