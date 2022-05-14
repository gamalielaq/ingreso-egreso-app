import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _angularFireAuth: AngularFireAuth
  ) { }

  createUser(nombre: string, email: string, password: string) {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password);
    // return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

}
