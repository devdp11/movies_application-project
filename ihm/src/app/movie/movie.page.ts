import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PlaylistsService } from '../services/playlists.service';

interface Movies {
    id: string;
    title: string;
    genre: string;
    rating: string;
    duration: string;
    release_year: string;
    synopsis: string;
    img: string;
    cast: string;
};

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  
  public CaseMovie: any;
  public movie: Movies | undefined;
  public dataMovies: Movies[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private playlistService: PlaylistsService) {}


  ngOnInit() {
    this.CaseMovie = this.route.snapshot.paramMap.get('id');
      fetch('./assets/data/movies.json')
      .then(res => res.json())
      .then(json => {
        this.dataMovies = json;
        this.movie = this.dataMovies.find((movie) => movie.id === this.CaseMovie);
      });
  }

  goWatchLater(){
    console.log('The watch later button was clicked');
    if (this.movie) {
      this.playlistService.addWatchLaterList(this.movie.id, this.movie.title, this.movie.img);
    } else {
      console.log('No movie Found');
    }
  }

}