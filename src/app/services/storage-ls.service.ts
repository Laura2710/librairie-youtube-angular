import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageLsService {
  // PLATFORM_ID pour le SSR
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Sauvegarder l'utilisateur
  saveUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      const users = this.getUsers();
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  // Récupérer tous les utilisateurs
  getUsers(): User[] {
    if (isPlatformBrowser(this.platformId)) {
      const users = localStorage.getItem('users');
      if (users) {
        return JSON.parse(users);
      }
    }
    return [];
  }

  // Récupérer un utilisateur par son pseudo et son mot de passe, retourner undefined si l'utilisateur n'existe pas
  getUserByPseudoAndPassword(
    pseudo: string,
    password: string
  ): User | undefined {
    const users = this.getUsers();
    return users.find(
      (user) => user.pseudo === pseudo && user.password === password
    );
  }
}
