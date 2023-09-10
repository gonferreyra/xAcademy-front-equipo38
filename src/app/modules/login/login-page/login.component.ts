import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
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

  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder) { 
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
    
    this.api.post("login/",FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrAuth = false ;
            if (typeof data === "object" && data && environment.TOKEN in data && typeof data[environment.TOKEN] === "string"){
              this.token = data[environment.TOKEN];
              console.log(this.token);
              localStorage.setItem("Token",<string>this.token)
        
        
          }
           
          },
           error: err =>{this.ErrAuth = true ; },
      });
    
  }
  save_local(data:any){ //TODO: hacer reutilizable la funcion. 
    if (typeof data === "object" && data && "token" in data && typeof data['token'] === "string"){
      this.token = data['token'];
      console.log(this.token);
      localStorage.setItem("Token",<string>this.token)


  }

}
}
