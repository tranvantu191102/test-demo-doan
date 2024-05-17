import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';
import { AngularFireDatabase} from '@angular/fire/compat/database';

type SpecificationSetting = {
  temperature: number;
  time: number;
  id: number;
  isFinish: boolean;
};

@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule, FormsModule],
})
export class HomeComponent {
  // private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  // private database = inject(Database);
  // usersCollection: CollectionReference = collection(this.firestore, 'settings');
  isRunning = false;

  constructor(private db: AngularFireDatabase){
    //
  }

  dateNow = new Date();

  settings: SpecificationSetting[] = [
    {
      temperature: 0,
      time: 0,
      id: Math.floor(Math.random()*99999999999),
      isFinish: false
    },
  ];

  onAddSetting() {
    this.settings.push({
      temperature: 0,
      time: 0,
      id: Math.floor(Math.random()*99999999999),
      isFinish: false
    });
  }

  onStart(event: Event) {
    event.preventDefault();

    const isVaild = this.settings.every((_) => !!_.temperature && !!_.time);
    if (!isVaild) {
      return;
    }
    // addDoc(this.usersCollection, {settings: this.settings}).then((data: DocumentReference) => {
    //   console.log('data',data)
    //   // this.database.type.
    // })
    console.log(this.settings);
  }

  trackByFunc = (index: number) => {
    return `${index}`
  }

  removeItem(setting: SpecificationSetting){
    this.settings = this.settings.filter(_ => _.id !== setting.id);
  }
}
