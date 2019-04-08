import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DishDetail, Comment, Utils } from '../shared';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  dish: DishDetail;
  dishIds: Array<string>;
  prev: string;
  next: string;
  commentsForm: FormGroup;
  formComment: Comment;
  @ViewChild('commentForm') commentFormRef;
  feedbackFormErrors: any = {
    author: '',
    comment: ''
  };
  validationMessage: any = {
    required: 'This field is required',
    minlength: '{0} should be atleast contain 2 characters',
    maxlength: '{0} can only contain 10 characters'
  };

  constructor(
    private router: ActivatedRoute,
    private dishService: DishService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(5)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.dishService.getDishIds().subscribe(ids => (this.dishIds = ids));
    this.router.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });

    this.commentsForm.valueChanges.subscribe(d => {
      this.onValueChanged(d);
      if (this.commentsForm.valid) {
        this.formComment = d;
        this.formComment.date = new Date().toISOString();
      } else {
        this.formComment = undefined;
      }
    });
  }

  ngOnInit() {}
  goBack() {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackFormErrors) {
      return;
    }
    const form = this.commentsForm;
    for (const field in this.feedbackFormErrors) {
      if (this.feedbackFormErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.feedbackFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          // const messages = this.validationMessage[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.feedbackFormErrors[field] +=
                Utils.FormatString(this.validationMessage[key], field) + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  submitForm() {
    this.dish.comments.push(this.formComment);
    this.commentFormRef.resetForm();
    this.commentsForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
  }
}
