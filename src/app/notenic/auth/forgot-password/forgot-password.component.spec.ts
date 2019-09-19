import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { INotenicState } from '@notenic/store/notenic.state';
import { initialState } from '@notenic/store/notenic.reducer';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      providers: [
        provideMockStore<IAuthState>({
          initialState: { ...initialAuthState },
        }),
        provideMockStore<INotenicState>({
          initialState: { ...initialState },
        }),
      ],
      declarations: [ ForgotPasswordComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
