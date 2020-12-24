import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteFormEnderecoDialogComponent } from './participante-form-endereco-dialog.component';

describe('ParticipanteFormEnderecoDialogComponent', () => {
  let component: ParticipanteFormEnderecoDialogComponent;
  let fixture: ComponentFixture<ParticipanteFormEnderecoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanteFormEnderecoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteFormEnderecoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
