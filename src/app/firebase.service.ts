import { inject, Injectable } from '@angular/core';
import blogPosts from './blog/blogPosts.json';
import { Event } from './event';
import { Member } from './member';
import { Database, ref, set, onValue, push, objectVal, object } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsArray: Array<Event>;
  eventObj: AngularFireObject<any>;
  eventList: AngularFireList<any>;

  constructor(
  private database: AngularFireDatabase,

) { }

  getEvents(): any {
    this.eventList = this.database.list('events')
    return this.eventList;
  }

  addEvent(eventData: Event) {
    const eventListRef = ref(this.database.database, '/submittedEvents');
    const eventsRef = push(eventListRef);
    set(eventsRef, eventData).then(() => {
      console.log('Event data saved successfully!');
    }).catch((error) => {
      console.log('Failed to save event data with the following error: ', error);
    });
  }

  addMember(memberData: Member) {
    const memberListRef = ref(this.database.database, 'members');
    const memberRef = push(memberListRef);
    set(memberRef, memberData).then(() => {
      console.log('Member data saved successfully!');
    }).catch((error) => {
      console.log('Failed to save member data with the following error: ', error);
    });
  }

}
