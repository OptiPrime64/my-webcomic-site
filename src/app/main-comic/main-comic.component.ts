import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css']
})
export class MainComicComponent implements OnInit {

  comicTitle: string = 'Default';
  comicAbout: string = 'This is the latest comic I\'ve done';
  private postsSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    const newPost: Comicpost = this.postService.getPost();
    if (newPost) {
      console.log(newPost.title);
      this.comicTitle = newPost.title;
      this.comicAbout = newPost.about;
    }
    this.postsSub = this.postService.postUpdated.subscribe((subPost) => {
      console.log(subPost.title);
      this.comicTitle = subPost.title;
      this.comicAbout = subPost.about;
    })

  }

}
