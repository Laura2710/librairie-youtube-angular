import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageSsService {
  private isAuthenticated: boolean = false;

  private login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.login();
    this.isAuthenticated = false;
    sessionStorage.clear();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  // Sauvegarder la session de l'utilisateur
  saveUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.login();
  }
}
