import { Component, OnInit } from '@angular/core';

interface Users {
  [key: string]: {
    id: string;
    name: string;
    username: string;
    password: string;
  };
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() {
    this.dataUsers = {}
  }

  public dataUsers: Users;

  ngOnInit() {
    fetch('./assets/data/users.json')
      .then(res => res.json())
      .then(json => {
        this.dataUsers = json;
      });
  }

}
