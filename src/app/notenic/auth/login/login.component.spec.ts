import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '@app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              error: null,
              info: null,
              isLoading: false,
              user: null,
              token: null,
            },
          }
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
