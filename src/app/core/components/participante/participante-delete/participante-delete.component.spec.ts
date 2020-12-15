import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteDeleteComponent } from './participante-delete.component';

describe('ParticipanteDeleteComponent', () => {
  let component: ParticipanteDeleteComponent;
  let fixture: ComponentFixture<ParticipanteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
