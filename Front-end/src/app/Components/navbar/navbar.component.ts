import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ThemeService } from 'src/app/Services/themes.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogegedIn:boolean=false;
 
  theme:any;
  themes_names:any;

  constructor(private theme_service: ThemeService,private _AuthService:AuthService){}

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue())
      {
        this.isLogegedIn=true;
      }
      else
      {
        this.isLogegedIn=false;
      }
    })

    this.theme_service.get_theme().subscribe({
      next:(data) => {        
        this.theme = data;  
      }
    });

    this.themes_names = this.theme_service.get_all_themes();   
  }

  setTheme = (chosen_theme:string) => {
    
    this.theme_service.set_theme(chosen_theme);

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
      }
    });
  }

  logout()
  {
    this._AuthService.logout()
  }
}

