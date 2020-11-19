import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comicpost } from './comicpost.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Comicpost[] = [];
  postsUpdated = new Subject<Comicpost[]>();


  constructor(private http: HttpClient) { }

  addPost(tempPost: Comicpost) {

    // const newPost = {
    //   title: tempPost.title,
    //   issue: tempPost.issue,
    //   about: tempPost.about
    // }
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', tempPost)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(tempPost);
        this.posts.sort((a, b) => {
          return a.issue - b.issue
        });
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPosts() {
    this.http.get<{ message: string, posts: Comicpost[] }>('http://localhost:3000/api/posts')
      .subscribe(
        (postData) => {
          this.posts = postData.posts;
          this.postsUpdated.next([...this.posts]);
        }
      );
  }

  // getpostsUpdatedListener() {
  //   return this.postsUpdated.asObservable();
  // }
}

