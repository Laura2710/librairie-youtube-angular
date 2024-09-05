import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  // Injection de l'environnement du navigateur
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Connexion
  private login(): void {
    this.isAuthenticated = true;
    this.authenticationStatus$.next(this.isAuthenticated); // Mise à jour de l'Observable
  }

  // Deconnexion
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    this.isAuthenticated = false;
    this.authenticationStatus$.next(this.isAuthenticated); // Mise à jour de l'Observable
  }

  // Récupérer l'authentification
  isAuth(): boolean {
    this.getUser();
    return this.isAuthenticated;
  }

  // Sauvegarder la session de l'utilisateur
  saveUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.login();
    }
  }

  // Récupérer la session de l'utilisateur
  getUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');
      if (user) {
        this.login();
      }
    }
  }

  // Récupérer le pseudo de l'utilisateur connecté
  getUserPseudo(): string | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');
      if (user) {
        return JSON.parse(user).pseudo;
      }
    }
    return undefined;
  }
}
