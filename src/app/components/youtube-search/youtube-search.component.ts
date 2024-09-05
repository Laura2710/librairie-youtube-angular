import { Component, EventEmitter, inject, Output } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Video } from '../../models/video';
import { StorageLsService } from '../../services/storage-ls.service';

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './youtube-search.component.html',
  styleUrl: './youtube-search.component.css',
})
export class YoutubeSearchComponent {
  private readonly serviceYoutube: YoutubeService = inject(YoutubeService);
  private readonly serviceStorage: StorageLsService = inject(StorageLsService);
  public videos: Video[] = [];
  private video: Video | undefined;
  public form: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
    maxResults: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.serviceYoutube
        .searchOnYoutube(this.form.value.search, this.form.value.maxResults)
        .subscribe((res) => {
          this.videos = res.map((video: any) => {
            console.log(video);
            return {
              etag: video.etag,
              title: video.snippet.title,
              description: video.snippet.description,
              thumbnail: video.snippet.thumbnails.high.url,
              id: video.id.videoId,
            };
          });
        });
    }
  }

  onAddVideoToList(video: Video) {
    if (video) {
      this.serviceStorage.saveVideo(video);
    }
  }
}
