
import { Component, inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Input() title: string = 'Confirmación';
  @Input() message: string = '¿Estás seguro que querés continuar?';
  @Input() close!: (value?: any) => void;
  
  modal = inject(ModalService);
}