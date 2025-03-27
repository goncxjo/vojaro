import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './layout/loading-screen/loading-screen.component';
import { WelcomeModalComponent } from './components/modals/welcome-modal/welcome-modal.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ModalWrapperComponent } from './layout/modal-wrapper/modal-wrapper.component';
import { SubjectStore } from './core/stores/subject.store';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreenComponent, NavbarComponent, ModalWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vojaro';

  subjectStore = inject(SubjectStore);
  modalService = inject(ModalService);

  ngOnInit() {
    this.subjectStore.loadSubjects();
  }
}
