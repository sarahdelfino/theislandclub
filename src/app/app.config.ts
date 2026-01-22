import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import {
  provideDatabase,
  getDatabase,
  connectDatabaseEmulator
} from '@angular/fire/database';
import {
  provideAuth,
  getAuth,
  connectAuthEmulator
} from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator
} from '@angular/fire/firestore';
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator
} from '@angular/fire/functions';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';
import { provideAnimations } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

// ✅ Initialize Firebase App
const firebaseConfig = environment.firebase;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,

    // --- Firebase services ---
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),

    provideDatabase(() => {
      const db = getDatabase();
      if (environment.useEmulators) {
        connectDatabaseEmulator(db, 'localhost', 9000);
      }
      return db;
    }),

    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),

    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    }),

    // --- Angular ---
    NavbarComponent,
    FooterComponent,
    AngularFireDatabase,
    provideHttpClient(withFetch()),

    // --- 3rd Party ---
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    provideNgxStripe(environment.stripe.publicKey),
    provideAnimations(),
  ],
};
