import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MembershipComponent } from './membership/membership.component';
import { CapitalComponent } from './capital/capital.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'capital-project', component: CapitalComponent },
    { path: 'blog', component: BlogComponent },
    { path: '**', component: HomeComponent }
];
