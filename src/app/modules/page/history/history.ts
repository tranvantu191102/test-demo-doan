import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SpecificationSetting } from '../../models/setting.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-history-component',
  standalone: true,
  templateUrl: './history.html',
  imports: [CommonModule],
})
export class HistoryComponent {
  dataSource: {
    isFinished: boolean;
    settings: SpecificationSetting[];
    startedAt: Date;
  }[];

  constructor(private fireStore: AngularFirestore) {
    this.fireStore
      .collection('settings')
      .valueChanges()
      .subscribe((data) => {
        this.dataSource = data.map((_: any) => ({
          ..._,
          startedAt: new Timestamp(
            _.startedAt.seconds,
            _.startedAt.nanoseconds
          ).toDate(),
        })) as {
          isFinished: boolean;
          settings: SpecificationSetting[];
          startedAt: Date;
        }[];
      });
  }
}
