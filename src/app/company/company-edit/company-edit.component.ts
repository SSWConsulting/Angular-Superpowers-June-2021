import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, filter, withLatestFrom } from 'rxjs/operators';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId?: number;
  isNewCompany!: boolean;

  companyForm = this.fb.group({
    name: ['', Validators.required],
    phone: [''],
    email: [''],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId!)
      .subscribe(c => this.companyForm.patchValue(c));
  }

  get f() {
    return this.companyForm.controls;
  }

  saveCompany(): void {
    const {value, valid} = this.companyForm;

    if (valid) {
      this.companyService
        .addCompany(value)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }

}
