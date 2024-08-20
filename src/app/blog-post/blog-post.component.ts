import { Component, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {
  public blogPost: Blog;

  constructor(private firebaseService: FirebaseService) {}

  @Input() set id(blogId: number) {
    // this.blogPost = this.firebaseService.mockGetBlogPost(blogId);
  }

  ngOnInit() {
    
  }

}
