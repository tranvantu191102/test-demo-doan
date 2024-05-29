import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PopupContainerComponent } from '../../components/popup/popup';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SystemRealtimeService } from '../../../services/system-realtime.service';
import { Subject, takeUntil } from 'rxjs';

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
export class HomeComponent implements OnDestroy{
  isShowPopupConfirm = false
  _onDestroy$ = new Subject<boolean>();
  isStarting = false;
  isShowSidebar = false;

  constructor( 
    private authFirebase: AngularFireAuth,  
    private systemRealtimeService: SystemRealtimeService,
    private router: Router){
    this.authFirebase.authState.subscribe((user) => {
      if(user?.uid){
           this.router.navigate(['/']);
      }else {
        this.router.navigate(['/login']);
      }
    })

    this.systemRealtimeService
      .getStatus()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((data) => {
        this.isStarting = data[0].value;
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
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

  hideSidebar(){
    this.isShowSidebar = false;
  }

  showSidebar(){
    this.isShowSidebar = true;
  }
}
