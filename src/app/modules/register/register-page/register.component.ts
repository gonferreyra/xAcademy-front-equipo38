import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:UntypedFormGroup;
  email = new UntypedFormControl('', [Validators.required,Validators.email]);
  password = new UntypedFormControl('', [Validators.required, Validators.min(8)]);
  repassword = new UntypedFormControl('', [Validators.required]);
  token:string = "";
  ErrAuth:boolean = false;
  ready:boolean = false;
  
  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder,private router: Router) { 
    this.form = this.formBuilder.group({
      email:this.email,
      password:this.password,
      userName:this.repassword
    });
  }
  ngOnInit() {}

  register() {
    let FormRaw = this.form.getRawValue();
    
    this.api.post("user/new/",FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrAuth = false;
            this.ready = true;
            this.router.navigate(['/','home']);
          },
           error: err =>{this.ErrAuth = true ; },
      });
    
  }
  
}
