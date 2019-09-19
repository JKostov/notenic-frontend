import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenicComponent } from './notenic.component';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { initialState } from '@notenic/store/notenic.reducer';

describe('NotenicComponent', () => {
  let component: NotenicComponent;
  let fixture: ComponentFixture<NotenicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, NotenicComponent ],
      providers: [
        provideMockStore({
          initialState: { auth: initialAuthState, notes: initialState },
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotenicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'router-outlet',
  template: `<div></div>`
})
class TestHostComponent {
  control = new FormControl();
}
