import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteContatoDialogComponent } from './participante-contato-dialog.component';

describe('ParticipanteContatoDialogComponent', () => {
  let component: ParticipanteContatoDialogComponent;
  let fixture: ComponentFixture<ParticipanteContatoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteContatoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteContatoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
