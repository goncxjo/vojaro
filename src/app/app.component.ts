import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './core/services/user.service';
import { LoadingScreenComponent } from './core/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbPopoverModule, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vojaro';
  @ViewChild('p') p!: NgbPopover

  userService = inject(UserService);

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
