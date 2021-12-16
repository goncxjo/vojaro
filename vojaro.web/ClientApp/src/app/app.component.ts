import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Cargando...';

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let title: string | null = null;
        let showPageTitle = true;

        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          title = child.snapshot.data['title'];
        }
        if (child?.snapshot.data['pageTitleHidden']) {
          showPageTitle = !child.snapshot.data['pageTitleHidden'];
        }
        return { title, showPageTitle };
      }),
    ).subscribe((cfg) => this.setTitle(cfg));
  }

  private setTitle(cfg: any) {
    this.title = cfg.showPageTitle ? cfg.title : '';
    this.titleService.setTitle('Temt2t3' + (cfg.title ? ' - ' + cfg.title : ''));
  }

  private navigateToStoredEndpoint() {
    const path = this.read('redirect');

    if (this.router.url === path) {
      return;
    }

    if (path.toString().includes('/unauthorized')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
