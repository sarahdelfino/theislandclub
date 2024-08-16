import { Component } from '@angular/core';
import blogPosts from './blogPosts.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
  blogs = blogPosts;

  ngOnInit() {
    console.log(this.blogs);
  }

}
