import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)]
      }),
      about: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSavePost(){
    if (this.form.invalid) {
      return;
    }
    const tempPost: Comicpost = {
      title: this.form.value.title,
      about: this.form.value.about
    };
    // console.log(tempPost);
    this.postService.addPost(tempPost)
  }

}
