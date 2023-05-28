import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth) { }

  criarConta(email:string, password:string){
    this.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password)
  }
}