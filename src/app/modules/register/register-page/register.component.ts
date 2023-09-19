import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:UntypedFormGroup;
  email = new UntypedFormControl('', [Validators.required,Validators.email]);
  password = new UntypedFormControl('', [Validators.required, Validators.min(8)]);
  repassword = new UntypedFormControl('', [Validators.required, Validators.min(8)]);
  token:string = "";
  ErrAuth:boolean = false;
  ErrMatch:boolean = false;
  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder) { 
    this.form = this.formBuilder.group({
      email:this.email,
      password:this.password,
      repassword:this.repassword
    });
  }
  ngOnInit() {
  this.form.valueChanges.subscribe({
    next: formValue => {
      
        if(formValue.password !== formValue.repassword){
            this.ErrMatch = true ;
        }
        else{
            this.ErrMatch = false ;
        }
          } 
    });
  }

  register() {
    let FormRaw = this.form.getRawValue();
    
    this.api.post("register/",FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrAuth = false ;
          },
           error: err =>{this.ErrAuth = true ; },
      });
    
  }
  
}
