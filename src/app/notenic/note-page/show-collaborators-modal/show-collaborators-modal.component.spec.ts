import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCollaboratorsModalComponent } from './show-collaborators-modal.component';

describe('ShowCollaboratorsModalComponent', () => {
  let component: ShowCollaboratorsModalComponent;
  let fixture: ComponentFixture<ShowCollaboratorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCollaboratorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCollaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
