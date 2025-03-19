import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  loadingIcon = faBolt
  loaderService = inject(LoaderService)

  isLoading() {
    return this.loaderService.isLoading();
  }
}
