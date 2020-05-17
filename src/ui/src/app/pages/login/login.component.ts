import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { isAuth } from 'src/app/shared/utils';

@Component({
  selector: 'cmd-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private authApiSrv: AuthApiService
  ) {}

  ngOnInit() {
    if (isAuth(window)) {
      this.router.navigateByUrl('companies');
    }
  }

  onLoginCLicked() {
    this.authApiSrv.login().subscribe((res) => {
      if (res && res.token && isPlatformBrowser(this.platformId)) {
        window.localStorage.setItem('Auth', res.token);
        this.router.navigateByUrl('companies');
      }
    });
  }
}
