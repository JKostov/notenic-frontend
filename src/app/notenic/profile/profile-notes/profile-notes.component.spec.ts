import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNotesComponent } from './profile-notes.component';

describe('ProfileNotesComponent', () => {
  let component: ProfileNotesComponent;
  let fixture: ComponentFixture<ProfileNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
