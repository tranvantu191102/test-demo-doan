import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PopupContainerComponent } from '../../components/popup/popup';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: './home.html',
  imports: [
    CommonModule, 
    RouterModule,
    PopupContainerComponent
  ],
})
export class HomeComponent {
  isShowPopupConfirm = false

  constructor( private authFirebase: AngularFireAuth, private router: Router){
    this.authFirebase.authState.subscribe((user) => {
      if(user?.uid){
           this.router.navigate(['/']);
      }else {
        this.router.navigate(['/login']);
      }
    })
  }

  onShowConfirmPopup(){
    this.isShowPopupConfirm = true;
  }

  closePopup(){
    this.isShowPopupConfirm = false;
  }

  onSignOut(){
    this.authFirebase.signOut().then(() => {
      //
      this.router.navigate(['/login'])
    })
  }
}
