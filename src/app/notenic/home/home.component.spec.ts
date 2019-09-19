import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '@notenic/store/notenic.reducer';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { INotenicState } from '@notenic/store/notenic.state';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<IAuthState>({
          initialState: { ...initialAuthState },
        }),
        provideMockStore<INotenicState>({
          initialState: { ...initialState },
        }),
      ],
      declarations: [ HomeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
