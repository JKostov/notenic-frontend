import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollaborationsComponent } from './profile-collaborations.component';

describe('ProfileCollaborationsComponent', () => {
  let component: ProfileCollaborationsComponent;
  let fixture: ComponentFixture<ProfileCollaborationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCollaborationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCollaborationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
