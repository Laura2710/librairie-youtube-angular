import { Component } from '@angular/core';
import { NavbarLibraryComponent } from '../../components/navbar-library/navbar-library.component';
import { YoutubePlayerComponent } from '../../components/youtube-player/youtube-player.component';
import { YoutubeSearchComponent } from '../../components/youtube-search/youtube-search.component';

@Component({
  selector: 'app-youtube-library',
  standalone: true,
  imports: [
    NavbarLibraryComponent,
    YoutubePlayerComponent,
    YoutubeSearchComponent,
  ],
  templateUrl: './youtube-library.component.html',
  styleUrl: './youtube-library.component.css',
})
export class YoutubeLibraryComponent {
  isYoutubeSearch: boolean = false;
  showYoutubeSearch(): void {
    this.isYoutubeSearch = !this.isYoutubeSearch;
  }
}
