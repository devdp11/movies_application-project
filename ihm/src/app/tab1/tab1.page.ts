import { Component, OnInit } from '@angular/core';

interface Movies {
  [key: string]: {
    id: string;
    category: string;
    rating: string;
    img: string;
    cast: string;
  };
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  constructor() {
    this.dataMovies = {}
  }
  
  public dataMovies: Movies;

  ngOnInit() {
      fetch('./assets/data/movies.json')
      .then(res => res.json())
      .then(json => {
        this.dataMovies = json;
      });
  }

}
