import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TracksComponent } from './Components/tracks/tracks.component';
import { AuthGuard } from './auth.guard';
import { CoursesDetailsComponent } from './Components/courses-details/courses-details.component';
import { TracksDetailsComponent } from './Components/tracks-details/tracks-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:"courses", component: CoursesComponent},
  {path:"tracks", component:TracksComponent},
  {path:"courses/:id", component:CoursesDetailsComponent},
  {path:"tracks/:id", component:TracksDetailsComponent}
  // {path:"courses",canActivate:[AuthGuard], component: CoursesComponent},
  // {path:"tracks",canActivate:[AuthGuard], component:TracksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
