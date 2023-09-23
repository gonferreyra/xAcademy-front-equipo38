import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:UntypedFormGroup;
  email = new UntypedFormControl('', [Validators.required,Validators.email]);
  password = new UntypedFormControl('', [Validators.required]);
  token:string = "";
  ErrAuth:boolean = false;

  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder,private router: Router) { 
    this.form = this.formBuilder.group({
      email:this.email,
      password:this.password,
    });
  }
  ngOnInit() {
  this.form.valueChanges.subscribe({
    next: formValue => {
       
    }
    });
  }

  login() {
    let FormRaw = this.form.getRawValue();
    console.log(FormRaw);
    this.api.post("auth/login/",FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrAuth = false ;
            
            if (typeof data === "object" && data && environment.TOKEN in data && typeof data[environment.TOKEN] === "string"){
              this.token = data[environment.TOKEN];
              const name = data["user"].us_name
              const id = data["user"].us_id
              localStorage.setItem("Token",<string>this.token);
              localStorage.setItem("Name",<string>name);
              localStorage.setItem("id",<string>id);
              this.router.navigate(['/','home']);
        }
           
          },
           error: err =>{
            console.log(err);
            this.ErrAuth = true ; },
      });
    
  }

}
