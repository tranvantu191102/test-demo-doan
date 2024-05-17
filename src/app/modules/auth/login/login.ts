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

  // private auth: Auth = inject(Auth);
  // user$ = user(this.auth);
  userSubscription: Subscription;
  constructor(private _router: Router, private authFirebase: AngularFireAuth){
  //   this.userSubscription = this.user$.subscribe((aUser: User | null) => {
  //     //handle user state changes here. Note, that user will be null if there is no currently logged in user.
  //  console.log(aUser);
  //  if(aUser?.uid){
  //    this._router.navigate(['/home']);
  //  }
    this.authFirebase.authState.subscribe((user) => {
      if(user?.uid){
           this._router.navigate(['/home']);
        }
    })
  }

  isValidEmail(s: string) {
    return /^[^@]+@[^@]+\.[^@]+$/.test(s)
  }

  isValidPassword(s: string) {
    return s.split(" ").length === s.length && s.length > 6
  }

  onSubmit(event: Event){
    event.preventDefault()
    console.log(this.loginInfo)

    const isEmailValid = this.isValidEmail(this.loginInfo.email);
    const isPasswordVaild = this.isValidPassword(this.loginInfo.password)

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

  }
  
}
