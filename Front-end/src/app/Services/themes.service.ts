import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private themes = [
    { name:"frozen", color: "#D95A2B", textColor: "#D95A2B", border: "5px solid #D95A2B", background:"white", divBackground: "#508BBF"}, 
    { name:"spiderman", color: "#D92332", textColor: "#FCFCFC", border: "5px solid #D92332", background:"#0D0D0D", divBackground: "#0D0D0D"}
  ];

  private theme = new BehaviorSubject <any>(this.themes.find((th) => {return th['name'] === "frozen"}));

  constructor() {
    this.theme.next(this.themes.find((th) => {return th['name'] === "frozen"}));
  }

  set_theme(theme_name:string) {
    this.theme.next(this.themes.find((th) => {return th['name'] === theme_name}));
  }

  get_theme(){
    return (this.theme);
  }

  get_all_themes(){
    let themes_names = (this.themes.map((th) => {return th['name']}));
    return (themes_names);
  }
}