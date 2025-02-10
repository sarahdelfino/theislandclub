import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
import { environment as devEnv } from '../environments/environment.development';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { MembershipComponent } from './membership/membership.component';
import { CapitalComponent } from './capital/capital.component';
import { BlogComponent } from './blog/blog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';

const firebaseConfig = environment.firebase;

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAnalytics(() => getAnalytics()), ScreenTrackingService, NavbarComponent, FooterComponent, provideDatabase(() => getDatabase()), AngularFireDatabase, provideHttpClient(withFetch()), { provide: FIREBASE_OPTIONS, useValue: firebaseConfig}, provideNgxStripe(devEnv.stripe.publicKey)],
};