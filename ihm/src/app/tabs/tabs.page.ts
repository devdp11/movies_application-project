import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alerta: AlertController, private router: Router) {}

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
