import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteReadComponent } from './participante-read.component';

describe('ParticipanteReadComponent', () => {
  let component: ParticipanteReadComponent;
  let fixture: ComponentFixture<ParticipanteReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
