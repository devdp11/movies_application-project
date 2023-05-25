import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Movies {
    id: string;
    title: string;
    category: string;
    rating: string;
    release_year: string;
    img: string;
    cast: string;
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  public dataMovies: Movies[] = [];
  public search1: string = '';
  public foundMovies: Movies[] = [];

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(){
    fetch('./assets/data/movies.json')
      .then((response) => response.json())
      .then((json) => {
        if(Array.isArray(json)){
          this.dataMovies = json;
          console.log('movie data loaded', this.dataMovies);
        } else {
          console.log('movie data is empty');
        }
      }).catch((error) => {
        console.log('error loading movie data |', error);
      });
  }

  search(){
    if(this.search1){
      const search = this.search1.toLowerCase();

      if (Array.isArray(this.dataMovies)){
        this.foundMovies = this.dataMovies.filter((movie) => 
        movie.cast.toLowerCase().includes(search)
        );
        if(this.foundMovies.length > 0) {
          console.log('found movie data', this.foundMovies);
        } else {
          console.log('no found movie data');
        }
      } else {
        console.log('its not an array of movies');
      }
    } else{
      console.log ('Write an name to search');
    }
  }
  
  goMovie(movie:Movies) {
    this.router.navigate(['/movie', movie.id]);
  }
}