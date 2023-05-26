import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PlaylistsService } from '../services/playlists.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private route: ActivatedRoute, private router: Router, private playlistService: PlaylistsService, private alerta: AlertController) {}


  ngOnInit() {
    this.CaseMovie = this.route.snapshot.paramMap.get('id');
      fetch('./assets/data/movies.json')
      .then(res => res.json())
      .then(json => {
        this.dataMovies = json;
        this.movie = this.dataMovies.find((movie) => movie.id === this.CaseMovie);
      });
  }

  async goWatchLater() {
    if (this.movie) {
      const movieExists = await this.playlistService.checkIfMovieExists(this.movie.id);
      if (movieExists) {
        this.showAlert('O filme selecionado já se encontra na playlist de ver mais tarde!');
      } else {
        this.playlistService.addWatchLaterList(this.movie.id, this.movie.title, this.movie.rating, this.movie.release_year, this.movie.genre, this.movie.img)
          .then(() => {
            this.showSuccessAlert('O filme colocado na playlist de ver mais tarde com sucesso!');
          })
          .catch(() => {
            this.showErrorAlert('Erro ao adicionar o filme à playlist de ver mais tarde!');
          });
      }
    } else {
      console.log('No movie found');
    }
  }
  
  async showAlert(message: string) {
    const alert = await this.alerta.create({
      message: message,
      buttons: ['Continuar']
    });
    await alert.present();
  }

  async showSuccessAlert(message: string) {
    const alert = await this.alerta.create({
      message: message,
      buttons: ['Continuar']
    });
    await alert.present();
  }
  
  async showErrorAlert(message: string) {
    const alert = await this.alerta.create({
      message: message,
      buttons: ['Continuar']
    });
    await alert.present();
  }

  async rating(){
    const alerta = await this.alerta.create({
      message: 'Avaliaste com sucesso o filme',
      buttons: ['Continuar']
    });
    await alerta.present();
    return;
  }
}