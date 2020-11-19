import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css']
})
export class MainComicComponent implements OnInit, OnDestroy {

  comicTitle: string = 'Default';
  comicIssue: number = 0;
  comicAbout: string = 'This is the latest comic I\'ve done';
  private postsSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();

    this.postsSub = this.postService.postsUpdated.subscribe((subPosts) => {
      const subPost: Comicpost = subPosts[subPosts.length - 1];
      console.log(subPost.title);
      this.comicTitle = subPost.title;
      this.comicIssue = subPost.issue;
      this.comicAbout = subPost.about;
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
