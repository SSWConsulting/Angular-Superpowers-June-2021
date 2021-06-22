import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CompanyService } from './company/company.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('COMPONENT: AppComponent manually', () => {
  let component: AppComponent;
  let companySvc: CompanyService;

  beforeEach(() => {
    companySvc = {
      getCompanies : () => {}
    } as CompanyService;

    component = new AppComponent(companySvc);
  });

  it('should do 1+1 = 2 - PASS', () => {
    let value = 1 + 1;
    expect(value).toEqual(2);
  });

  // it('should do 1+1 = 2 - FAIL', () => {
  //   let value = 1 + 1;
  //   expect(value).toEqual(22);
  // })

  it('Title to be "Angular Superpowers"', () => {
    expect(component.title).toEqual('Angular Superpowers');
  });

  it('companyCount = 1', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company',
        email: 'fakeemail@ssw.com.au',
        phone: 12345
      }
    ]));

    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    })
  });

  it('companyCount = 2', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company',
        email: 'fakeemail@ssw.com.au',
        phone: 12345
      },
      {
        name: 'Fake Company B',
        email: 'fakeemailB@ssw.com.au',
        phone: 12345
      }
    ]));

    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    })
  });
});


describe('COMPONENT: AppComponent from Angular', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Need these for routing
        CompanyTableComponent,
        CompanyEditComponent
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    })

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.inject(CompanyService);
  });

  it('companyCount = 1', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company',
        email: 'fakeemail@ssw.com.au',
        phone: 12345
      }
    ]));
    fixture.detectChanges();

    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    })
  });

  it('CompanyCount HTML should update', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company',
        email: 'fakeemail@ssw.com.au',
        phone: 12345
      }
    ]));
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');
  })
});
