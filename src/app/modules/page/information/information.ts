import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { SystemRealtimeService } from '../../../services/system-realtime.service';
import { Subject, interval, takeUntil, timer } from 'rxjs';
import { PopupContainerComponent } from '../../components/popup/popup';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SpecificationSetting } from '../../models/setting.model';
import { SensorRealtimeService } from '../../../services/sensor-realtime.service';
import { FunctionPipe } from '../../../pipes';
import { Timestamp } from 'firebase/firestore';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-information-component',
  standalone: true,
  templateUrl: './information.html',
  imports: [CommonModule, PopupContainerComponent, FunctionPipe, RouterModule],
})
export class InformationComponent implements OnDestroy {
  private _onDestroy$ = new Subject<boolean>();
  isStarting = false;

  dateNow = new Date();
  isShowPopupConfirm = false;

  settings: SpecificationSetting[] = [];
  currentSetting: SpecificationSetting;
  currentTempature: number;
  currentSettingIndex: number;
  phaseTimeMax: number;

  timer$ = interval(1000).pipe(takeUntil(this._onDestroy$));
  isUpdatedData = false;


  constructor(
    private systemRealtimeService: SystemRealtimeService,
    private sensorRealtimeService: SensorRealtimeService,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.systemRealtimeService
      .getStatus()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((data) => {
        this.isStarting = data[0].value;
      });

    this.sensorRealtimeService
      .getStatus()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((data) => {
        this.currentTempature = data[0].value;
      });

    const documentId = localStorage.getItem('settingId');
    if (documentId) {
      this.fireStore
        .collection('settings')
        .doc(documentId)
        .valueChanges()
        .subscribe((data: any) => {
          console.log(data);

          this.phaseTimeMax = new Timestamp(
            data.startedAt.seconds,
            data.startedAt.nanoseconds
          )
            .toDate()
            .getTime();
          this.settings = data?.settings as SpecificationSetting[];
          this.currentSetting = data.settings.find(
            (_: SpecificationSetting, index: number) => {
              this.phaseTimeMax += _.time * 60 * 1000;
              if (!_.isFinish) {
                this.currentSettingIndex = index;
              }
              return !_.isFinish;
            }
          );

          this.isUpdatedData = false;
        });
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
  }

  onEnd() {
    this.isShowPopupConfirm = true;
  }

  end() {
    this.systemRealtimeService.end().then(() => {
      this.isStarting = false;
      localStorage.removeItem('settingId');
      this.router.navigate(['/setting']) 
    });
  }

  getTimeOut = (time: number) => {
    return this.countdownFromNow(this.phaseTimeMax);
  };

  countdownFromNow(pastTime: number) {
    // Get the current time in milliseconds
    const now = Date.now();

    // Calculate the difference between current time and past time in milliseconds
    const difference = pastTime - now;

    // Check if the past time has already passed (negative difference)
    if (difference <= 0) {
      if (this.isUpdatedData) {
        return;
      }
      const documentId = localStorage.getItem('settingId');
      if (this.currentSettingIndex === this.settings.length - 1) {
        this.systemRealtimeService.end().then(() => {
          this.router.navigate(['/setting']);
          localStorage.removeItem('settingId');
        });
        this.fireStore
          .doc(`settings/${documentId}`)
          .update({ isFinised: true });
        return;
      }

      if (documentId) {
        this.isUpdatedData = true;

        this.systemRealtimeService.update(
          Number(this.settings[this.currentSettingIndex + 1].temperature),
          Number(this.settings[this.currentSettingIndex + 1].time),
        ).then()

        this.fireStore
          .doc(`settings/${documentId}`)
          .update({
            settings: this.settings.map((_) => {
              if (_.id === this.currentSetting.id) {
                return { ..._, isFinish: true };
              }

              return _;
            }),
          })
          .then(() => {});

       
      }

      return;
    }

    // Calculate remaining time in seconds, minutes, hours, and days
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    // Format the countdown string with leading zeros for aesthetics
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');

    // Build the countdown string
    let countdownString = '';
    countdownString += `${formattedHours} : `;
    countdownString += `${formattedMinutes} : `;
    countdownString += `${formattedSeconds} `;

    return countdownString;
  }

  closePopup() {
    this.isShowPopupConfirm = false;
  }
}
