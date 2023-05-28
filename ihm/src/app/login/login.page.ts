import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  seeForm: FormGroup;
  isSent: boolean;
  userInfo: any = [];

  constructor(private router: Router, private auth: AngularFireAuth, private alerta: AlertController) {
    this.seeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password:  new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.isSent = false;
  }

  async sendForm() {
    this.isSent = true;
    if (!this.seeForm.valid) {
      return false;
    } else {

      const email = this.seeForm.value.email;
      const password = this.seeForm.value.password;

      try {
        if (await this.auth.signInWithEmailAndPassword(email, password)) {
          this.router.navigate(['tabs']);
        }
      } catch (error) {
        this.showErrorAlert('Email ou password inválidos!');
      }
      return true;
    }
  }

  async showAlert(message: string) {
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

  get formControls() { 
    return this.seeForm.controls;
  }

}
