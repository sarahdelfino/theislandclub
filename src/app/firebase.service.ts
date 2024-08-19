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
    // public database: Database = inject(Database),
  private database: AngularFireDatabase,
  // private db: AngularFireDatabase = inject(AngularFireDatabase)
) { }

  mockGetBlogPost(id: number) {
    let selectedPost = {
      id: 0,
      title: '',
      description: '',
      date: ''
    }
    for (let post in blogPosts) {
      if (blogPosts[post].id == id) {
        selectedPost = blogPosts[post];
      }
    }
    return selectedPost;
  }

  getDonationAmount() {
    return 47182;
  }

  getEvents(): any {
    this.eventList = this.database.list('events')
    return this.eventList;
    // const eventsRef = ref(this.database, '/events');
    // onValue(eventsRef, (snapshot) => {
    //   console.log("snap: ", snapshot.val());
    //   this.eventObj = snapshot.val();
    //   this.eventList = snapshot.val();
    //   return this.eventObj;
    // });
  }

  addEvent(eventData: Event) {
    // const eventListRef = ref(this.database, '/events');
    // const eventsRef = push(eventListRef);
    // set(eventsRef, eventData).then(() => {
    //   console.log('Event data saved successfully!');
    // }).catch((error) => {
    //   console.log('Failed to save event data with the following error: ', error);
    // });
  }

  addMember(memberData: Member) {
    // const memberListRef = ref(this.database, 'members');
    // const memberRef = push(memberListRef);
    // set(memberRef, memberData).then(() => {
    //   console.log('Member data saved successfully!');
    // }).catch((error) => {
    //   console.log('Failed to save member data with the following error: ', error);
    // });
  }

  getBlogPosts() {
  //   const blogRef = ref(this.database, '/blog');
  //   onValue(blogRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("data : ", data);
  //   });
  }

}
