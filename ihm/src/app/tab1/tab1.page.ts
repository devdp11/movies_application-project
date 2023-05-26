import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Movies {
    id: string;
    genre: string;
    rating: string;
    img: string;
    cast: string;
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public dataMovies: Movies[] = [];

  constructor(private router: Router, private alerta: AlertController) {
  }
  
  ngOnInit() {
      fetch('./assets/data/movies.json')
      .then(res => res.json())
      .then(json => {
        this.dataMovies = json;
      });
  }

  goMovie(movie:Movies) {
    this.router.navigate(['/movie', movie.id]);
  }

  async logout() {
    const alerta = await this.alerta.create({
      message: 'Tens a certeza que desejas sair da aplicação?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            alerta.dismiss();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.router.navigate(['/login']);
            alerta.dismiss();
          }
        }
      ]
    });
    await alerta.present();
    return;
  }
}
