import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Blog } from '../blog';
import { Location, CommonModule } from '@angular/common';
import post from './post.json';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [SafeHtmlPipe, CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {
  public blogPost: any;
  public id: string;
  public html: string;
  public mobile = true;

  constructor(private db: FirebaseService,
    private location: Location
  ) {
    if (window.innerWidth > 760) {
      this.mobile = false;
    }
    this.id = this.location.path().split('/')[2];
    this.db.getBlogPost(this.id).valueChanges().subscribe((resp: any) => {
      this.blogPost = resp;
      this.html = this.blogPost.post;
    });
    
  }

}
