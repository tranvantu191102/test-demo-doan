import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import { environment } from '../environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuth,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ])
    // importProvidersFrom(
    //   provideFirebaseApp(() => initializeApp(environment.firebase))
    // ),
    // importProvidersFrom(
    //   provideDatabase(() => getDatabase())
    // ),
    // importProvidersFrom(
    //   provideAuth(() => getAuth())
    // ),
    // importProvidersFrom(
    //   provideFirestore(() => getFirestore())
    // ),
    
  ],
  
};
