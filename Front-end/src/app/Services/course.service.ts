import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly URL = "http://localhost:7000/api/courses";

  constructor(private readonly myClient: HttpClient) { }

  get_all_courses() {
    return this.myClient.get(this.URL);
  }

  get_course_by_id(course_id:any) {
    return this.myClient.get(this.URL + "/" + course_id);
  }
}
