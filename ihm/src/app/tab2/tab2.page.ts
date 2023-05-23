import { Component, OnInit } from '@angular/core';

interface Movies {
  [key: string]: {
    id: string;
    title: string;
    category: string;
    imdb_rating: string;
    release_year: string;
    img: string;
  };
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

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
