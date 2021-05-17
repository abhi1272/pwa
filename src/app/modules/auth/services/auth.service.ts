import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>
  public currentUser: Observable<any>
  public roleNavigationData
  public accountLogo
  constructor(public http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  apiUrl = environment.url

  public get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  signUp(email): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/signup`, email)
  }

  completeSignUp(obj): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/complete_signup_attempt`, obj)
      .pipe(map(user => {
        this.setUser(user)
      }))
  }

  signIn(obj): any {
    return this.http.post(`${this.apiUrl}/login`, obj)
      .pipe(map(user => {
        this.setUser(user)
      }))
  }

  setUser(user): any{
    const currentuser = { user: user.user, token: user.token, details: user.details }
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(currentuser))
    this.currentUserSubject.next(currentuser)
    return user
  }

  inviteUserSetPassword(obj): any{
    return this.http.post(`${this.apiUrl}/complete_invitation_attempt`, obj)
    .pipe(map(user => {
      this.setUser(user)
    }))
  }

  public logout(): void{
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  forgetPassword(obj): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/forgot_password`, obj)
  }

  resetPassword(obj): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/reset_password`, obj)
  }

  login(loginData) {
    // this.loggedIn = true
    return this.http.post(this.apiUrl + '/users/login', loginData)
  }

  signUP(signUpData) {
    return this.http.post(this.apiUrl + '/users/signup', signUpData)
  }
}
