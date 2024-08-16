import { Injectable } from '@angular/core';
// import db from './firebase';
import blogPosts from './blog/blogPosts.json';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

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

}
