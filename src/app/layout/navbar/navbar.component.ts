import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  userService = inject(UserService);

  getUserName() {
    return this.userService.getUserName();
  }
  
  login() {
    return this.userService.loginWithGoogle();
  }
  
  logout() {
    return this.userService.logout();
  }
}
