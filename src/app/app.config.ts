import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule, // firestore
      AngularFireAuthModule, // auth
      AngularFireStorageModule, // storage
      AngularFireDatabaseModule,
      AngularFireAuthGuardModule,
    ),
    provideRouter(routes)]
};
