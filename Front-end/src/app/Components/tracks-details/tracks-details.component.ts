import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/Services/themes.service';
import { TrackService } from 'src/app/Services/track.service';

@Component({
  selector: 'app-tracks-details',
  templateUrl: './tracks-details.component.html',
  styleUrls: ['./tracks-details.component.css']
})
export class TracksDetailsComponent implements OnInit {

  theme:any;
  background_img_url = "";

  track_id = "";
  track:any = {};
  track_img = "";
  courses_num:any = 0; 

  constructor(private theme_service: ThemeService, private myService: TrackService, activated: ActivatedRoute){
    this.track_id = activated.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.myService.get_track_by_id(this.track_id).subscribe({
      next: (data) => {
        this.track = data;
        this.courses_num = this.track.courses.length;   
        this.set_track_theme_image();
      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/background.jpg";
        this.set_track_theme_image();
      }
    });
  }

  set_track_theme_image(){
    this.track_img  = this.track.track_Img.find((img:any) => {return img.includes(this.theme.name)});
  }
}
