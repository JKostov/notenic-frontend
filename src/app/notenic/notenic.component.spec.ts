import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenicComponent } from './notenic.component';

describe('NotenicComponent', () => {
  let component: NotenicComponent;
  let fixture: ComponentFixture<NotenicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotenicComponent ]
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
