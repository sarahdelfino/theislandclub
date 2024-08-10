import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { MembershipComponent } from './membership/membership.component';
import { CapitalComponent } from './capital/capital.component';
import { BlogComponent } from './blog/blog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"theislandclub","appId":"1:939559041500:web:6e456a66fd2c8852aef719","databaseURL":"https://theislandclub-default-rtdb.firebaseio.com","storageBucket":"theislandclub.appspot.com","apiKey":"AIzaSyC6vSLkiU0Mzb0cpJm7NKlyuNwdnymXqcE","authDomain":"theislandclub.firebaseapp.com","messagingSenderId":"939559041500"})), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideFirestore(() => getFirestore()), NavbarComponent],
};
