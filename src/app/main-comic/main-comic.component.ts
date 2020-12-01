import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css']
})
export class MainComicComponent implements OnInit, OnDestroy {

  comicPosts: Comicpost[] = [];
  comicTitle: string;
  comicIssue: number;
  comicAbout: string;
  comicImage: string;
  currentPage: number;
  private postsSub: Subscription;

  constructor(private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.postService.getPosts();

    this.postsSub = this.postService.postsUpdated.subscribe((newPosts) => {
      this.route.paramMap.subscribe((paramMap) => {
        const issueNumber = (paramMap.get("issue"));
        if (issueNumber) {
          this.comicPosts = newPosts;
          this.currentPage = +issueNumber - 1;
          const currentPost: Comicpost = newPosts[this.currentPage];
          this.comicTitle = currentPost.title;
          this.comicIssue = currentPost.issue;
          this.comicAbout = currentPost.about;
          this.comicImage = currentPost.imagePath;

        } else {
          this.comicPosts = newPosts;
          this.currentPage = newPosts.length - 1;
          const currentPost: Comicpost = newPosts[this.currentPage];
          this.comicTitle = currentPost.title;
          this.comicIssue = currentPost.issue;
          this.comicAbout = currentPost.about;
          this.comicImage = currentPost.imagePath;
        }
      });
    });
  }

  firstComic() {
    this.currentPage = 0;
    const currentPost: Comicpost = this.comicPosts[0];
    this.comicTitle = currentPost.title;
    this.comicIssue = currentPost.issue;
    this.comicAbout = currentPost.about;
    this.comicImage = currentPost.imagePath;
  }

  previousComic() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      const currentPost: Comicpost = this.comicPosts[this.currentPage];
      this.comicTitle = currentPost.title;
      this.comicIssue = currentPost.issue;
      this.comicAbout = currentPost.about;
      this.comicImage = currentPost.imagePath;
    } else {
      return;
    }
  }

  nextComic() {
    if (this.currentPage < this.comicPosts.length - 1) {
      this.currentPage += 1;
      const currentPost: Comicpost = this.comicPosts[this.currentPage];
      this.comicTitle = currentPost.title;
      this.comicIssue = currentPost.issue;
      this.comicAbout = currentPost.about;
      this.comicImage = currentPost.imagePath;
    } else {
      return;
    }
  }

  lastComic(){
    this.currentPage = this.comicPosts.length - 1
    const currentPost: Comicpost = this.comicPosts[this.comicPosts.length - 1];
      this.comicTitle = currentPost.title;
      this.comicIssue = currentPost.issue;
      this.comicAbout = currentPost.about;
      this.comicImage = currentPost.imagePath;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
