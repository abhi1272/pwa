import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  constructor(public authService: AuthService, private toastr: ToastrService,
              public router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  public submit() {
    this.authService.signUP(this.registerForm.value).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data['data']['newUser']))
      this.toastr.success(data['message'])
      this.router.navigate(['/home'])
    }, (error) => {
      this.toastr.success(error)
    })
  }

}
