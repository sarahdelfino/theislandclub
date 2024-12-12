import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  
  constructor(private db: FirebaseService) {}
  blogs: any;

  // newSummary = {
  //   "date": "12/12/2024",
  //   "description": "On December 3rd, we kicked off the holiday festivities with a special event — our Ladies Wine Night, where members came together to decorate the club and celebrate the start of December.",
  //   "id": "",
  //   "img": "/holiday.jpg",
  //   "title": "Celebrating the Season: Decorating the Sullivan's Island Club for Christmas"
  // }

  newPost = {
    "date": "Thursday, December 12th",
    "img": "/holiday",
    "post": "<p>The holiday season is all about tradition, togetherness, and creating a warm, welcoming environment for friends and family to gather. At the Sullivan's Island Club, decorating for Christmas goes beyond just creating a beautiful space—it’s an opportunity to honor these traditions and share in the joy of the season with the entire community.</p><p>On December 3rd, we kicked off the holiday festivities with a special event—our Ladies Wine Night, where members came together to decorate the club and celebrate the start of December. It was an evening filled with laughter, good company, and plenty of holiday cheer as we sipped wine and exchanged holiday stories. With garlands, twinkling lights, and festive touches everywhere, the club quickly transformed into a cozy, inviting holiday haven.</p><p>If you’re looking for a festive, community-centered spot to enjoy the season, we invite you to join us or host your own event at the club. From the twinkling lights to the warm, welcoming atmosphere, your neighborhood Island Club is a great place to spend the holiday season!</p><p>Wishing you all a joyful and merry holiday season, from our club to your home!</p>",
    "title": "Decorating the Sullivan's Island Club for Christmas"
  }

  ngOnInit() {
    // this.db.addBlogSummary(this.newSummary);
    // this.db.addBlogPost(this.newPost);
    this.db.getBlogs().valueChanges().subscribe((resp: any) => {
      this.blogs = resp;
    });
  }

}
