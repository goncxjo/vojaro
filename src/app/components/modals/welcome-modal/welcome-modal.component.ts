
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faRightLong, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.scss'
})
export class WelcomeModalComponent {
  modal = inject(NgbActiveModal);
}