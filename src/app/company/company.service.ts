import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  public getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(
      `${this.API_BASE}/company/${companyId}`
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  public addCompany(company: Company): void {
    this.httpClient.post<Company>(
      `${this.API_BASE}/company`,
      company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    ).subscribe(() => this.loadCompanies());
  }

  public deleteCompany(companyId: number): void {
    this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)))
      .subscribe(() => this.loadCompanies());
  }

  public updateCompany(company: Company): void {
    this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`,
      company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(
      catchError(error => this.errorHandler<Company>(error))
    ).subscribe(() => this.loadCompanies());
  }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log('[SERVICE] tap', x)),
        catchError(error => this.errorHandler<Company[]>(error)),
      )
      .subscribe(companies => this.companies$.next(companies));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('ERROR', error);
    return new Observable<T>();
  }
}
