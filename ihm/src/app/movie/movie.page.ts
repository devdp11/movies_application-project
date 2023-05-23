import { Component, OnInit } from '@angular/core';

interface Movies {
  [key: string]: {
    id: string;
    title: string;
    category: string;
    rating: string;
    duration: string;
    release_year: string;
    synopsis: string;
    img: string;
  };
};

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

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