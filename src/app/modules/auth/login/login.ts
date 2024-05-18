import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { AuthRepository } from '../../../repositories/auth.repository';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-component',
  standalone: true,
  templateUrl: './login.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthService
    },
  ]
})
export class LoginComponent {
  title = 'do-an-tot-nghiep';

  loginInfo: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  }

  isError = false;

  userSubscription: Subscription;
  constructor(private _router: Router, private authFirebase: AngularFireAuth){
    this.authFirebase.authState.subscribe((user) => {
      if(user?.uid){
           this._router.navigate(['/']);
      }
    })
  }

  isValidEmail(s: string) {
    return /^[^@]+@[^@]+\.[^@]+$/.test(s)
  }

  isValidPassword(s: string) {
    return s.trim().length === s.length && s.length > 6
  }

  onSubmit(event: Event){
    event.preventDefault()
   

    const isEmailValid = this.isValidEmail(this.loginInfo.email);
    const isPasswordVaild = this.isValidPassword(this.loginInfo.password)
    console.log("isEmailValid",isEmailValid, "isPasswordVaild",isPasswordVaild)

    if(!isEmailValid || !isPasswordVaild){
      return;
    }

    // signInWithEmailAndPassword(this.auth,this.loginInfo.email, this.loginInfo.password)
    // .then((info) => {
    //   this.isError = false;
    //   this._router.navigate(['/home']);
    // })
    // .catch(() => {
    //   this.isError = true;
    // })

    this.authFirebase.signInWithEmailAndPassword(
      this.loginInfo.email,
      this.loginInfo.password
    ).then((data) => {
      this.isError = false;
      this._router.navigate(['/']);
      console.log(this.loginInfo,data)
    })
    .catch(() => {
      this.isError = true;
    })

  }
  
}
