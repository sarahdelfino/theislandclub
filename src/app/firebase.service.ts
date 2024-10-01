import { inject, Injectable } from '@angular/core';
import blogPosts from './blog/blogPosts.json';
import { Event } from './event';
import { Member } from './member';
import { Database, ref, set, onValue, push, objectVal, object, update } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsArray: Event[];
  eventObj: AngularFireObject<any>;
  eventList: AngularFireList<any>;
  blogsList: AngularFireList<any>;
  blogPost: AngularFireObject<any>;

  constructor(
  private database: AngularFireDatabase,

) { }

  getEvents(): any {
    this.eventList = this.database.list('events')
    return this.eventList;
  }

  getBlogs(): any {
    this.blogsList = this.database.list('blogs');
    return this.blogsList;
  }

  getBlogPost(id: string): any {
    console.log(id);
    this.blogPost = this.database.object('blog-posts/' + id);
    console.log(this.blogPost);
    return this.blogPost;
  }

  addEvent(eventData: Event): any {
    const eventListRef = ref(this.database.database, '/submittedEvents');
    const eventsRef = push(eventListRef);
    set(eventsRef, eventData).then(() => {
      console.log('Event data saved successfully!');
    }).catch((error) => {
      console.log('Failed to save event data with the following error: ', error);
      return error;
    });
    return eventsRef;
  }

  addMessage(messageData: any): any {
    const messageListRef = ref(this.database.database, '/message-submissions');
    const messageRef = push(messageListRef);
    set(messageRef, messageData).then(() => {
      console.log("message data saved successfully!");
    }).catch((error) => {
      console.log('Failed to save message data with the following error: ', error);
      return error;
    });
    return messageRef;
  }

  updateEventState(id: string) {
    const eventsRef = ref(this.database.database, '/submittedEvents/' + id + '/state/');
    set(eventsRef, 'approved').catch((error) => {
      console.log("unable to update event state at id: ", id, " due to error: ", error);
    })
  }

  addMember(memberData: Member) {
    const memberListRef = ref(this.database.database, '/members');
    const memberRef = push(memberListRef);
    return set(memberRef, memberData);
  }

  // addBlog(blogData: any) {
  //   const blogListRef = ref(this.database.database, '/blog-posts');
  //   const blogRef = push(blogListRef);
  //   return set(blogRef, blogData);
  // }

}
