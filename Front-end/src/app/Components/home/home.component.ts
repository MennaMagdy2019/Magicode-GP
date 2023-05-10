import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/Services/themes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private _router:Router, private theme_service: ThemeService){
  }

  theme:any;
  bg_img_url_1 = "";
  bg_img_url_5 = "";
  bg_img_url_6 = "";

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;

        this.bg_img_url_1 = "assets/themes/" + this.theme['name'] + "/home-1.jpg";
        this.bg_img_url_5 = "assets/themes/" + this.theme['name'] + "/home-5.jpg";
        this.bg_img_url_6 = "assets/themes/" + this.theme['name'] + "/home-6.jpg";
      }
    });
  }

  navigateToCourses(){
    this._router.navigate(['courses'])
  }

  navigateToTracks(){
    this._router.navigate(['tracks'])
  }

  navigateToSignup(){
    this._router.navigate(['register'])
  }
}
