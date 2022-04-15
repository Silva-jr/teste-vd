import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Users } from 'src/app/security/models/user';
import { UserAuth } from 'src/app/security/models/userAuth';
import { LoginService } from 'src/app/users/service/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  user: Users = new Users();
  securityObject: UserAuth = null;
  currentUser: UserAuth = new UserAuth();
  erro: string;
  isLoading = true;
  helper = new JwtHelperService();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {}
  loginForm: FormGroup;
  @Input()
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  loginUser() {
    this.loginService.userLogin(this.loginForm.value).subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      (data: any) => {
        this.erro = null;
        sessionStorage.setItem('Token', data.access_token);
        this.currentUser = this.loginService.decodeTokne();
        this.router.navigate(['/']);
        console.log('certo');
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
