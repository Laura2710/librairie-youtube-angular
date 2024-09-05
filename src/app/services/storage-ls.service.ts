import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { Video } from '../models/video';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageLsService {
  videoListSubject: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Charger les vidéos lors de l'initialisation
    if (isPlatformBrowser(this.platformId)) {
      const videos = this.getVideos();
      this.videoListSubject.next(videos); // Initialisation du BehaviorSubject avec les vidéos
    }
  }

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

  // Récupérer les videos sauvegardées
  getVideos(): Video[] {
    if (isPlatformBrowser(this.platformId)) {
      const videos = localStorage.getItem('videos');
      if (videos) {
        return JSON.parse(videos);
      }
    }
    return [];
  }

  // Sauvegarder une video
  saveVideo(video: Video): void {
    if (isPlatformBrowser(this.platformId)) {
      const videos = this.getVideos();
      videos.push(video);
      localStorage.setItem('videos', JSON.stringify(videos));
      this.videoListSubject.next(videos); // Mise à jour du BehaviorSubject
    }
  }

  // Supprimer une video
  removeVideo(video: Video): void {
    if (isPlatformBrowser(this.platformId)) {
      let videos = this.getVideos();
      videos = videos.filter((v) => v.etag !== video.etag);
      localStorage.setItem('videos', JSON.stringify(videos));
      this.videoListSubject.next(videos); // Mise à jour du BehaviorSubject
    }
  }
}
