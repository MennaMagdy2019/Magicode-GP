import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  
  constructor(private _router:Router, private theme_service: ThemeService, private myService: CourseService){}

  theme:any;

  background_img_url = "";
  courses:any = [];

  ngOnInit(): void {

    this.myService.get_all_courses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
        
        this.set_courses_theme_images();
      },
      error: (err) => {
        alert(err);
      }
    });


    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/courses_tracks_bg.jpg";
        this.set_courses_theme_images();
      }
    });
  }

  view_course_details(course_id:any){
    this._router.navigate([`courses/${course_id}`])
  }

  set_courses_theme_images(){
    this.courses.map((course:any) => {
      let course_img = course.course_Img.find((img:any) => {return img.includes(this.theme.name)}); 
      course.theme_img = course_img;
    })
  }
}
