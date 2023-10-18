import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificates-form',
  templateUrl: './certificates-form.component.html',
  styleUrls: ['./certificates-form.component.css']
})
export class CertificatesFormComponent implements OnInit {

  form:UntypedFormGroup;
  training = new UntypedFormControl('', [Validators.required]);
  institution = new UntypedFormControl('', [Validators.required]);
  year = new UntypedFormControl('', [Validators.required]);
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  ErrFoot:boolean = true;
  SvForm:boolean = false;
  id!: string;
  
  data = [{
    ce_id: 0,
    ce_training: "dummy",
    ce_institution: "dummy",
    ce_year: "0000",
    }];
  

  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder, private router: Router) { 
    this.form = this.formBuilder.group({
      training:this.training,
      institution:this.institution,
      year:this.year,
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

    this.api.get("certificate/"+this.id).subscribe({
      next: (response:any) =>{
        this.ErrFoot = true ;
        this.data = [...response.certificate];
     },
      error: err =>{
        this.ErrFoot = false ; 
     },
 });
  
  
  }



  save() {
    let FormRaw = this.form.getRawValue();
    const token = localStorage.getItem("Token");   //descomentar para usar con TOKEN
      if(!token){
        this.router.navigate(['/','login']);
      }
    this.api.setHeader("Authorization","Bearer "+ token);
    
    this.api.post("certificate/new/"+this.id,FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrForm = false ;
            this.SvForm = true;
            console.log(data.newCertificate);
            this.data.push(data.newCertificate);
          },
           error: err =>{
            console.log(err);
            this.ErrForm = true ; 
          },
      });
    
  }
  
  cancel() {
    this.router.navigate(['create/','experience']);
  }

  delete(id:number , index: number){
    this.api.delete("certificate/"+id).subscribe({
      next: (data:any) =>{
       this.ErrDel = false ;
       this.data.splice(index, 1);
      },
      error: err =>{
        this.ErrDel = true ; 
        
      },
       
 });
  }

  update(id:number){
   this.form.setValue({
      training:this.data[id].ce_training,
      institution:this.data[id].ce_institution,
      year: this.data[id].ce_year.substring(0, 4)
    })
  }

}
