import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteCreateComponent } from './participante-create.component';

describe('ParticipanteCreateComponent', () => {
  let component: ParticipanteCreateComponent;
  let fixture: ComponentFixture<ParticipanteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
