import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  }

  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(
      `${this.API_BASE}/company/${companyId}`
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  public addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company`,
      company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  public deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)));
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`,
      company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('ERROR', error);
    return new Observable<T>();
  }
}
