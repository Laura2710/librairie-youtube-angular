import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

@Component({
  selector: 'app-youtube-player',
  standalone: true,
  imports: [],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
})
export class YoutubePlayerComponent implements AfterViewInit, OnDestroy {
  private readonly youtubeService: YoutubeService = inject(YoutubeService);
  public videoId: string = '';
  public player: any;

  // Appelé une fois que le composant est chargé et lorsqu'on a besoin d'intéragir avec le DOM
  ngAfterViewInit(): void {
    this.loadYouTubeAPI();
  }

  // Charger l'API YouTube IFrame
  loadYouTubeAPI(): void {
    // Si l'API est déjà chargée, initialiser le lecteur
    if (window['YT']?.Player) return this.initializePlayer();

    // Si l'API n'est pas encore chargée, charger le script en mode asynchrone
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.body.appendChild(tag);

    // Définir la fonction de rappel de l'API
    window['onYouTubeIframeAPIReady'] = () => this.initializePlayer();
  }

  // Initialiser le lecteur YouTube
  initializePlayer(): void {
    // S'abonner à l'ID de la vidéo sélectionnée
    this.youtubeService.selectedVideo$.subscribe((videoId) => {
      this.videoId = videoId;
      this.createPlayer(videoId);
    });
  }

  // Créer un lecteur YouTube ou mettre à jour l'existant
  createPlayer(videoId: string): void {
    this.player?.loadVideoById(videoId) ??
      (this.player = new window['YT'].Player('player', {
        height: '360',
        width: '640',
        videoId,
        events: { onStateChange: this.onPlayerStateChange },
      }));
  }
  // Réagir aux changements d'état du lecteur
  onPlayerStateChange(event: any): void {
    if (event.data === window['YT'].PlayerState.PLAYING) {
      console.log('La vidéo est en train de jouer');
    }
  }

  // Détruire le lecteur lors de la destruction du composant
  ngOnDestroy(): void {
    this.player?.destroy();
  }
}
