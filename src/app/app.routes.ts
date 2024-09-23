import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MembershipComponent } from './membership/membership.component';
import { CapitalComponent } from './capital/capital.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';

export const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'membership', title: 'Membership', component: MembershipComponent },
    { path: 'events', title: 'Events', component: EventsComponent },
    // { path: 'events/:id', title: 'Event', component: EventDetailComponent },
    { path: 'events/:id/approve', title: 'Event', component: EventsComponent },
    { path: 'capital-project', title: 'Capital Project', component: CapitalComponent },
    { path: 'blog', title: 'Blog', component: BlogComponent },
    { path: 'blog/:id', component: BlogPostComponent },
    { path: '**', component: AppComponent }
];
