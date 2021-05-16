import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router,
              private toastr: ToastrService) { }

  loginForm: FormGroup

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  public submit() {
    this.authService.login(this.loginForm.value).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data['data']['user']))
      this.toastr.success(data['message'])
      this.router.navigate(['/home'])
    }, (error) => {
      this.toastr.success(error)
    })
  }
}
