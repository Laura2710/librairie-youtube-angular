import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageSsService {
  private isAuthenticated: boolean = false;
  private readonly authenticationStatus$ = new BehaviorSubject<boolean>(
    this.isAuthenticated
  );
  public readonly authenticationStatus =
    this.authenticationStatus$.asObservable();

  private login(): void {
    this.isAuthenticated = true;
    this.authenticationStatus$.next(this.isAuthenticated); // Mise à jour de l'Observable
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authenticationStatus$.next(this.isAuthenticated); // Mise à jour de l'Observable
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

  // Récupérer le pseudo de l'utilisateur connecté
  getUserPseudo(): string | undefined {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user).pseudo;
    }
    return undefined;
  }
}
