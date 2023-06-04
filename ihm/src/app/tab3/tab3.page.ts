import { Component, OnInit } from '@angular/core';
import { PlaylistsService, Movie } from '../services/playlists.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private playListService: PlaylistsService, private storage: Storage, private router: Router, private alerta: AlertController) {}

  ngOnInit() {
    this.loadWatchLaterMovies();
  }
  // Esta função serve para carregar os filmes que estão guardados na storage nesta página.
  async loadWatchLaterMovies() {
    try {
      this.watchLaterMovies = await this.playListService.getPlaylistMovies();
      console.log('Watch Later movies":', this.watchLaterMovies);
    } catch (error) {
      console.error('Error getting the movies":', error);
    }
  }
  // Serve para remover o movie, chamando a função presente no service playlists
  async removeMovie(movie: Movie) {
    try {
      console.log('Movie removed', movie);
      await this.loadWatchLaterMovies();

      const alerta = await this.alerta.create({
        message: 'Tens a certeza que desejas remover o filme da playlist?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              this.router.navigate(['/tabs/tab3']);
              alerta.dismiss();
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.playListService.removeMoviesPlaylist(movie);
              this.router.navigate(['/tabs/tab3']);
              alerta.dismiss();
            }
          }
        ]
      });
      await alerta.present();
      return;
    } catch (error) {
      console.error('Error removing the movie', error);
    }
  }
  // Serve para adicionar filmes à storage e dar load desses filmes nesta página
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