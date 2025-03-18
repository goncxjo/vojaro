
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faRightLong, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-network-references-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './network-references-modal.component.html',
  styleUrl: './network-references-modal.component.scss'
})
export class NetworkReferencesModalComponent {
  asignatura = faCircle;
  optativa = faSquare;
  correlativa = faRightLong;
  tesis = faStar;

  modal = inject(NgbActiveModal);
}