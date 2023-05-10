import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private readonly URL = "http://localhost:7000/api/instructor";

  constructor(private readonly myClient: HttpClient) { }

  get_instructor_by_id(instructor_id:any) {
    return this.myClient.get(this.URL + "/" + instructor_id);
  }
}