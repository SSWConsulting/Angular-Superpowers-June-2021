import { Component, OnInit } from '@angular/core';
import { Company } from '../company';


@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companies = [
      { name: 'Company 1', email: 'Email  1', phone: 1111 },
      { name: 'Company 2', email: 'Email  2', phone: 2222 },
      { name: 'Company 3', email: 'Email  3', phone: 3333 },
    ];
  }

}
