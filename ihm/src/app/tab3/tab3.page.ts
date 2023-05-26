import { Component, OnInit } from '@angular/core';
import { PlaylistsService, Movie } from '../services/playlists.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

interface Movies {
  id: string;
  title: string;
  rating: string;
  release_year: string;
  genre: string;
  img: string;
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  
  public watchLaterMovies: Movie[] = [];

  constructor(private playListService: PlaylistsService, private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.loadWatchLaterMovies();
  }

  async loadWatchLaterMovies() {
    try {
      this.watchLaterMovies = await this.playListService.getPlaylistMovies();
      console.log('Watch Later movies":', this.watchLaterMovies);
    } catch (error) {
      console.error('Error getting the movies":', error);
    }
  }

  async removeMovie(movie: Movie) {
    try {
      await this.playListService.removeMoviesPlaylist(movie);
      console.log('Movie removed', movie);
      await this.loadWatchLaterMovies();
    } catch (error) {
      console.error('Error removing the movie', error);
    }
  }

  async addMovies(id: string, title: string, rating: string, release_year: string, genre: string, img: string) {
    try {
      await this.playListService.addWatchLaterList(id, title, rating, release_year, genre, img);
      console.log('Movie added sucessfully');
      await this.loadWatchLaterMovies();
    } catch (error) {
      console.error('Error adding the movie', error);
    }
  }

  goMovie(movie:Movies) {
    this.router.navigate(['/movie', movie.id]);
  }
}
