import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteCrudComponent } from './participante-crud.component';

describe('ParticipanteCrudComponent', () => {
  let component: ParticipanteCrudComponent;
  let fixture: ComponentFixture<ParticipanteCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
