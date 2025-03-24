import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './core/services/user.service';
import { LoadingScreenComponent } from './layout/loading-screen/loading-screen.component';
import { WelcomeModalComponent } from './components/modals/welcome-modal/welcome-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbPopoverModule, LoadingScreenComponent, MatToolbarModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vojaro';

  userService = inject(UserService);

  constructor(
    private modalService: NgbModal,
  ) {
    // this.modalService.open(WelcomeModalComponent, { centered: true, scrollable: true })
  }


  getUser() {
    return this.userService.getCurrentUser();
  }
  
  login() {
    return this.userService.loginWithGoogle();
  }
  
  logout() {
    return this.userService.logout();
  }
}
