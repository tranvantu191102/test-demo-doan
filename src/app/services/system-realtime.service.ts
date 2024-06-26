import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({ providedIn: 'root' })
export class SystemRealtimeService {
  system: AngularFireList<any>;

  constructor(private fireDatabase: AngularFireDatabase) {
    this.system = this.fireDatabase.list('system');
  }

  getStatus() {
    return this.system.snapshotChanges().pipe(
      map((response: any) => {
        return response.map((c: any) => {
          const key = c.payload.key;
          const value = c.payload.val();
          return { key, value };
        });
      })
    );
  }

  start(setPointTemp: number, setPointTime: number) {
    return this.fireDatabase
      .object('system')
      .update({ isStart: true, setPointTemp, setPointTime });
  }

  end() {
    return this.fireDatabase
      .object('system')
      .update({ isStart: false, setPointTemp: 0, setPointTime: 0 });
  }

  update(setPointTemp: number, setPointTime: number){
    return this.fireDatabase
      .object('system')
      .update({ setPointTemp, setPointTime });
  }
}
