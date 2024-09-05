import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = environment.YOUTUBE_API_KEY;
  private apiURL = 'https://www.googleapis.com/youtube/v3';

  // BehaviorSubject pour gérer l'URL de la video selectionnée
  public selectedVideoSubject = new BehaviorSubject<string>('');
  public selectedVideo$ = this.selectedVideoSubject.asObservable();

  constructor(private http: HttpClient) {}

  searchOnYoutube(query: string, maxResults: number) {
    const url = `${this.apiURL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${this.apiKey}`;
    return this.http.get(url).pipe(map((res: any) => res.items));
  }

  selectVideo(videoID: string) {
    this.selectedVideoSubject.next(videoID);
  }
}
