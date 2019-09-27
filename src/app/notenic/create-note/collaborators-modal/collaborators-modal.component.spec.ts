import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsModalComponent } from './collaborators-modal.component';

describe('CollaboratorsModalComponent', () => {
  let component: CollaboratorsModalComponent;
  let fixture: ComponentFixture<CollaboratorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
