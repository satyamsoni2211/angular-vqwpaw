import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl } from '@angular/forms';
interface User {
  username: string;
  password: string;
  remember: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    remember: false
  };
  constructor(public dialog: MatDialogRef<LoginComponent>) {}

  ngOnInit() {}
  onSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(this.user);
    this.dialog.close();
  }
}
