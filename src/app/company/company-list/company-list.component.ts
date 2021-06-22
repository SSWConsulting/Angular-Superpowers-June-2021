import { Component, OnInit, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companies$ = this.companyService.getCompanies()

    // const component: CompanyListComponent = this;
    // this.companyService.getCompanies()
    //   .subscribe(function(companies) {
    //     component.companies = companies;
    //   });
  }

  deleteCompany(companyId: number) {
    this.companyService.deleteCompany(companyId);
  }
}
