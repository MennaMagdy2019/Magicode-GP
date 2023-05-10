import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/course.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ThemeService } from 'src/app/Services/themes.service';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.css']
})
export class CoursesDetailsComponent implements OnInit {

  theme:any;
  background_img_url = "";

  course:any = {};
  course_id:any;
  course_img = "";

  instructor:any = {};

  constructor(private theme_service: ThemeService, private readonly myService: CourseService, activated: ActivatedRoute, private readonly inst_service: InstructorService){
    this.course_id = activated.snapshot.params["id"];

  }

  ngOnInit(): void {

    this.myService.get_course_by_id(this.course_id).subscribe({
      next: (data) => {
        this.course = data; 
        this.set_course_theme_image();

        // ====================== instructor
        this.inst_service.get_instructor_by_id(this.course.instructor._id).subscribe({
          next: (data) => {
            this.instructor = data;
            console.log(data);
             
          },
          error: (err) => {
            alert(err);
          }
        })

      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/background.jpg";
        this.set_course_theme_image();
      }
    });
  }

  set_course_theme_image(){
    this.course_img  = this.course.course_Img.find((img:any) => {return img.includes(this.theme.name)});
  }
}