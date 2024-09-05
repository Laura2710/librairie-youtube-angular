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

  // Appelé une fois que le composant est chargé
  ngAfterViewInit(): void {
    this.loadYouTubeAPI();
  }

  // Charger l'API YouTube IFrame
  loadYouTubeAPI() {
    // Vérifier si l'API est déjà chargée
    if (window['YT'] && window['YT'].Player) {
      // Si l'API est déjà prête, créer le lecteur immédiatement
      this.initializePlayer();
    } else {
      // Si l'API n'est pas encore chargée, charger le script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      // Définir la fonction de rappel de l'API
      window['onYouTubeIframeAPIReady'] = () => {
        this.initializePlayer();
      };
    }
  }

  // Initialiser le lecteur YouTube
  initializePlayer() {
    // S'abonner à l'ID de la vidéo sélectionnée
    this.youtubeService.selectedVideo$.subscribe((videoId) => {
      this.videoId = videoId;
      this.createPlayer(videoId);
    });
  }

  // Créer un lecteur YouTube ou mettre à jour l'existant
  createPlayer(videoId: string) {
    if (this.player) {
      // Si un lecteur existe déjà, mettre à jour la vidéo
      this.player.loadVideoById(videoId);
    } else {
      // Créer un nouveau lecteur si aucun n'existe
      this.player = new window['YT'].Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          onStateChange: this.onPlayerStateChange,
        },
      });
    }
  }

  // Réagir aux changements d'état du lecteur
  onPlayerStateChange(event: any) {
    if (event.data === window['YT'].PlayerState.PLAYING) {
      console.log('La vidéo est en train de jouer');
    }
  }

  // Détruire le lecteur lors de la destruction du composant
  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }
}
