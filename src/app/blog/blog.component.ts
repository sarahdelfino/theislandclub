import { Component } from '@angular/core';
import blogPosts from './blogPosts.json';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
  constructor(private db: FirebaseService) {}
  blogs: any;

  ngOnInit() {
    this.db.getBlogs().valueChanges().subscribe((resp: any) => {
      this.blogs = resp;
    })
  }

}
