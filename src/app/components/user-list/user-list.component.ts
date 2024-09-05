import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageLsService } from '../../services/storage-ls.service';
import { Video } from '../../models/video';
import { Subscription } from 'rxjs';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  public videos: Video[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly storageService: StorageLsService,
    private readonly youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements de la liste de vidéos
    this.subscription = this.storageService.videoListSubject.subscribe(
      (videos) => {
        this.videos = videos;
      }
    );
  }

  onRemoveVideoFromList(video: Video): void {
    this.storageService.removeVideo(video);
  }

  ngOnDestroy(): void {
    // Désabonnement pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Méthode appelée lorsqu'une vidéo est sélectionnée
  onVideoSelected(video: Video): void {
    this.youtubeService.selectVideo(video.id); // appel de la fonction du service youtube
  }
}
