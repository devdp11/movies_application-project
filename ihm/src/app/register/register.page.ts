import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  createForm: FormGroup;
  isSent: boolean;
  userInfo: any = [];

  constructor(private router: Router, private auth: AngularFireAuth, private alerta: AlertController){
    this.createForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password:  new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.isSent = false;

  }

  ngOnInit(){ }

  async sendForm() {
    this.isSent = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      const email = this.createForm.value.email;
      const password = this.createForm.value.password;
  
      try {
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.showAlert('Utilizador criado com sucesso!');
        console.log('Successfully created the user');
      } catch (error) {
        this.showErrorAlert('Email em utilização!');
        console.log('Not possible to create user');
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
    return this.createForm.controls;
  }
}
