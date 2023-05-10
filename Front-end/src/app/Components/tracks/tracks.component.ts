import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';
import { Router } from '@angular/router';
import { TrackService } from 'src/app/Services/track.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})

export class TracksComponent implements OnInit {
  constructor(private _router:Router, private theme_service: ThemeService, private myService: TrackService){}

  theme:any;

  background_img_url = "";
  tracks_img = "";

  tracks:any = []; 

  ngOnInit(): void {

    this.myService.get_all_tracks().subscribe({
      next: (data) => {
        this.tracks = data;    
        this.set_tracks_theme_images();
      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/courses_tracks_bg.jpg";
        this.set_tracks_theme_images();
      }
    });
  }

  view_track_details(track_id:any){
    this._router.navigate([`tracks/${track_id}`])
  }

  set_tracks_theme_images(){
    this.tracks.map((track:any) => {
      let track_img = track.track_Img.find((img:any) => {return img.includes(this.theme.name)});
      track.theme_img = track_img;
    })
  }
}