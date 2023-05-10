import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = "http://localhost:7000/api/tracks";

  constructor(private readonly myClient: HttpClient) { }

  get_all_tracks() {
    return this.myClient.get(this.URL);
  }

  get_track_by_id(track_id:any) {
    return this.myClient.get(this.URL + "/" + track_id);
  }
}
