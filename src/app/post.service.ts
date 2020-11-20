import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Comicpost } from './comicpost.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Comicpost[] = [];
  postsUpdated = new Subject<Comicpost[]>();


  constructor(private http: HttpClient,
    private router: Router) { }

  addPost(clientPost: Comicpost) {

    this.http.post<{ comicpost: Comicpost }>('http://localhost:3000/api/posts', clientPost)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  getPosts() {
    this.http.get<{ message: string, comicposts: Comicpost[] }>('http://localhost:3000/api/posts')
      .subscribe(
        (transformedPostData) => {
          this.posts = transformedPostData.comicposts;
          this.posts.sort((a, b) => {
            return a.issue - b.issue
          });
          this.postsUpdated.next([...this.posts]);
        }
      );
  }

  getPost(postId: string) {
    return this.http.get<Comicpost>('http://localhost:3000/api/posts/' + postId);
  }

  updatePost(updatedPost: Comicpost) {
    this.http.put<{ message: string }>('http://localhost:3000/api/posts/' + updatedPost._id, updatedPost)
      .subscribe(message => {
        console.log(message);
        this.getPosts();
        this.router.navigate(['/archive']);
      })
  }

  deletePost(postId: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + postId)
      .subscribe(message => {
        this.getPosts();
      })
  }

}

