import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;
  postId: string;
  mode: string = 'create';
  imagePreview: string;

  constructor(private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      issue: new FormControl(null, {
        validators: [Validators.required]
      }),
      about: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if (paramMap.has('postId')) {
        console.log('Edit mode')
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
          .subscribe((postData: Comicpost) => {
            this.form.setValue({
              title: postData.title,
              issue: postData.issue,
              about: postData.about
            });
          });
      } else {
        console.log('Create mode')
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create'){
      const tempPost: Comicpost = {
        title: this.form.value.title,
        issue: this.form.value.issue,
        about: this.form.value.about,
        imagePath: this.form.value.image
      };
      this.postService.addPost(tempPost);
    } else {
      const tempPost: Comicpost = {
        _id: this.postId,
        title: this.form.value.title,
        issue: this.form.value.issue,
        about: this.form.value.about,
        imagePath: this.form.value.image
      };
      this.postService.updatePost(tempPost);
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
