import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
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

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({"projectId":"theislandclub","appId":"1:939559041500:web:6e456a66fd2c8852aef719","databaseURL":"https://theislandclub-default-rtdb.firebaseio.com","storageBucket":"theislandclub.appspot.com","apiKey":"AIzaSyC6vSLkiU0Mzb0cpJm7NKlyuNwdnymXqcE","authDomain":"theislandclub.firebaseapp.com","messagingSenderId":"939559041500"})), provideAnalytics(() => getAnalytics()), ScreenTrackingService,NavbarComponent, FooterComponent, provideDatabase(() => getDatabase()), AngularFireDatabase, { provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
};