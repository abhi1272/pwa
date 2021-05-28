import { Component, Inject, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public authService: AuthService, public router: Router,
              private toastr: ToastrService) { }

  loginForm: FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  public submit(): void {
    this.authService.login(this.loginForm.value).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data['data'].user))
      this.authService.user = data['data'].user
      this.toastr.success(data['message'])
      this.router.navigate(['/home'])
    }, (error) => {
      console.log(error)
      this.toastr.error('user id or password is incorrect')
    })
  }
}
