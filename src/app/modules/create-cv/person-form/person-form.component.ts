import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  form:UntypedFormGroup;
  name = new UntypedFormControl('', [Validators.required]);
  lastName = new UntypedFormControl('', [Validators.required]);
  address = new UntypedFormControl('', [Validators.required]);
  email = new UntypedFormControl('', [Validators.required]);
  phone = new UntypedFormControl('', [Validators.required]);
  
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  SvForm:boolean = false;
  BttSave:boolean= true;
  id!: string;
  
 
  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder, private router: Router) { 
    this.form = this.formBuilder.group({
      name: this.name,
      lastName: this.lastName,
      address:this.address,
      email:this.email,
      phone:this.phone,
     
    });
    
  }
  ngOnInit() {
  /*this.form.valueChanges.subscribe({   //Acciones sobre el formulario
    next: formValue => {
       
    }
    });*/
    const id = localStorage.getItem("id")
    if( id != null){
      this.id= id;
    }
    else{
      this.router.navigate(['/','login']);
    }
    this.api.get("person/"+this.id).subscribe({
      next: (response:any) =>{
      this.BttSave = false;
       const data = response.person;
       this.form.setValue({
          name:data.pe_name,
          lastName:data.pe_lastName,
          address:data.pe_address,
          email:data.pe_email,
          phone:data.pe_phone,
        })
      },
      error: err =>{
         
        ; 
      },
    })
  }

  save() {
    let FormRaw = this.form.getRawValue();
    const token = localStorage.getItem("Token");   //descomentar para usar con TOKEN
      if(!token){
        this.router.navigate(['/','login']);
      }
    this.api.setHeader("Authorization","Bearer "+ token);
    
    this.api.post("person/new/"+this.id,FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrForm = false ;
            this.SvForm = true ;
          },
           error: err =>{this.ErrForm = true ; 
            this.SvForm = false ;
          
          },
      });
    
  }

  update(){
    let FormRaw = this.form.getRawValue();
    const token = localStorage.getItem("Token");   //descomentar para usar con TOKEN
      if(!token){
        this.router.navigate(['/','login']);
      }
    this.api.setHeader("Authorization","Bearer "+ token);
    
    this.api.put("person/"+this.id,FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrForm = false ;
            this.SvForm = true ;
          },
           error: err =>{this.ErrForm = true ; 
            this.SvForm = false ;
          
          },
      });
    


  }
  
  cancel() {
    this.router.navigate(['/','#']);
  }

}
