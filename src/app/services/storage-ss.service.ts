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
    this.isAuthenticated = false;
    sessionStorage.clear();
  }

  isAuth(): boolean {
    this.getUser();
    return this.isAuthenticated;
  }

  // Sauvegarder la session de l'utilisateur
  saveUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.login();
  }

  getUser(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.login();
    }
  }
}
