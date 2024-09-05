import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { Video } from '../models/video';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageLsService {
  private cachedVideos: Video[] = [];
  videoListSubject: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.videoListSubject.next(this.getVideos());
    }
  }

  // Sauvegarder l'utilisateur
  saveUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') ?? '[]');
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

  // Récupérer les videos sauvegardées
  getVideos(): Video[] {
    if (isPlatformBrowser(this.platformId)) {
      this.cachedVideos = JSON.parse(localStorage.getItem('videos') ?? '[]');
    }
    return this.cachedVideos || [];
  }

  // Sauvegarder une video
  saveVideo(video: Video): void {
    if (isPlatformBrowser(this.platformId)) {
      const videos = this.getVideos();
      const newVideos = [...videos, video];
      localStorage.setItem('videos', JSON.stringify(newVideos));
      this.videoListSubject.next(newVideos);
    }
  }

  // Supprimer une video
  removeVideo(video: Video): void {
    if (isPlatformBrowser(this.platformId)) {
      const videos = this.getVideos().filter((v) => v.etag !== video.etag);
      localStorage.setItem('videos', JSON.stringify(videos));
      this.cachedVideos = videos;
      this.videoListSubject.next(videos);
    }
  }
}
