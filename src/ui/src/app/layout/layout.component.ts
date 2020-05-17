import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';
import { isAuth } from '../shared/utils';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'cmd-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
    `
      header {
        background-color: var(--primary);
        height: 33vh;
        clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0% 70%, 0 0);
      }
    `,
  ],
})
export class LayoutComponent implements OnInit {
  year = new Date().getFullYear();
  items: MenuItem[];
  isAuthenticate: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router) {}

  ngOnInit() {
    this.isAuthenticate = isAuth(window);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        debounceTime(100)
      )
      .subscribe(() => {
        this.isAuthenticate = isAuth(window);
      });

    this.items = [
      {
        label: 'Companies',
        routerLink: '/companies',
      },
      {
        label: 'Contact',
        routerLink: '/contact',
      },
    ];
  }

  onLogoutClicked() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem('Auth');
      this.router.navigateByUrl('/home');
    }
  }
}
