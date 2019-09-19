import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedModule } from '@app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { INotenicState } from '@notenic/store/notenic.state';
import { initialState } from '@notenic/store/notenic.reducer';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
      declarations: [ RegisterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
