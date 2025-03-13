import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatars';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvatarModule, NgbPopoverModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vojaro';
  @ViewChild('p') p!: NgbPopover

  userService = inject(UserService);

  login() {
    return this.userService.loginWithGoogle();
  }
}
