import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { SystemRealtimeService } from '../../../services/system-realtime.service';
import { Subject, takeUntil } from 'rxjs';
import { SpecificationSetting } from '../../models/setting.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-component',
  standalone: true,
  templateUrl: './setting.html',
  imports: [CommonModule, FormsModule],
})
export class SettingComponent implements OnDestroy {
  settingsRef: AngularFirestoreCollection<{
    settings: SpecificationSetting[];
    isFinished: boolean;
    startedAt: Date;
    endedAt?: Date;
  }>;

  private _onDestroy$ = new Subject<boolean>();

  isStarting = false;

  constructor(
    private systemRealtimeService: SystemRealtimeService,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.settingsRef = this.firestore.collection('settings');

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

  dateNow = new Date();

  settings: SpecificationSetting[] = [
    {
      temperature: 0,
      time: 0,
      id: Math.floor(Math.random() * 99999999999),
      isFinish: false,
    },
  ];

  onAddSetting() {
    this.settings.push({
      temperature: 0,
      time: 0,
      id: Math.floor(Math.random() * 99999999999),
      isFinish: false,
    });
  }

  onStart(event: Event) {
    event.preventDefault();

    const isVaild = this.settings.every((_) => !!_.temperature && !!_.time);
    if (!isVaild) {
      return;
    }

    this.settingsRef
      .add({
        settings: this.settings,
        isFinished: false,
        startedAt: new Date(),
      })
      .then((data) => {
        localStorage.setItem('settingId', data.id);

        this.systemRealtimeService
          .start(
            Number(this.settings[0].temperature),
            Number(this.settings[0].time)
          )
          .then(() => {
            this.isStarting = true;
            this.router.navigate(['/info']);
          })
          .catch(() => {
            this.isStarting = false;
            localStorage.removeItem('settingId');
          });
      });
  }

  trackByFunc = (index: number) => {
    return `${index}`;
  };

  removeItem(setting: SpecificationSetting) {
    this.settings = this.settings.filter((_) => _.id !== setting.id);
  }
}
