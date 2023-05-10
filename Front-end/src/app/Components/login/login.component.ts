import { Component, OnInit } from '@angular/core';
import{ FormControl,FormGroup,Validators} from'@angular/forms';
import { ThemeService } from 'src/app/Services/themes.service';
import { AuthService } from 'src/app/Services/auth.service'; 
import { Router } from '@angular/router';
import{HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  valid:boolean=true;
  loginForm:FormGroup;
  constructor(private _AuthService:AuthService, private theme_service: ThemeService, private _Router:Router){
    this.loginForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/^\w+([-+.']\w+)*@[A-Za-z\d]+\.com$/)]),
      'password':new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      
    })
  }

  theme:any;

  background_img_url = "";

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/signup_login_bg.jpg";
      }
    });
  }

  submitForm(){
    if(this.loginForm.invalid)
    {
      return;
    }
     this._AuthService.login(this.loginForm.value).subscribe((response)=>{
      
      // try{
      //   console.log(response)
      // }
      // catch(error)
      // {
      //    console.log(error)
      // }
      if(response.message=='Login successfully')
      {
        console.log(response)
        localStorage.setItem('userToken',response['x-auth-token']);
        this._AuthService.saveUserData();
        this._Router.navigateByUrl('home');
      }
      // else
      // {
      //   console.log(response)
      //   this.valid=false;
      //   console.log(this.valid) 
      // }
      //console.log(data)
    },(err)=>{
      this.valid=false;
      console.log(err.error.message)
    })
    // if(this.registerForm.invalid)
    // {
    //   return;
    // }
    // this._AuthService.register(this.registerForm.value).subscribe((data)=>{
    //   console.log(data)
    // })
   // console.log(this.loginForm.value)
  }
}
