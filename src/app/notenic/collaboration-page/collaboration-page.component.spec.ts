import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationPageComponent } from './collaboration-page.component';

describe('CollaborationPageComponent', () => {
  let component: CollaborationPageComponent;
  let fixture: ComponentFixture<CollaborationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
