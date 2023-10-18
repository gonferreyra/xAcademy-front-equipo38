import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {
  form:UntypedFormGroup;
  position = new UntypedFormControl('', [Validators.required]);
  startDate = new UntypedFormControl('', [Validators.required]);
  finishDate = new UntypedFormControl('', [Validators.required]);
  companyName = new UntypedFormControl('', [Validators.required]);
  description = new UntypedFormControl('', [Validators.required]);
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  ErrFoot:boolean = true;
  SvForm:boolean = false;
  id!: string;
  
  data = [{
    ex_id: 0,
    ex_position: "dummy",
    ex_startDate: "0000-01-01",
    ex_finishDate: "0000-01-01",
    ex_companyName: "dummy",
    ex_description:"dummy",
    }];

  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder, private router: Router) { 
    this.form = this.formBuilder.group({
      position : this.position,
      startDate : this.startDate,
      finishDate : this.finishDate,
      companyName : this.companyName,
      description : this.description,
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
    this.api.get("experience/"+this.id).subscribe({
      next: (response:any) =>{
        this.ErrFoot = true ;
       this.data = [...response.experience];
     },
      error: err =>{
      this.ErrFoot = false ; 
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
    
    this.api.post("experience/new/"+this.id,FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrForm = false ;
            this.SvForm = true;
            console.log(data.newExperience);
            this.data.push(data.newExperience);
          },
           error: err =>{
            console.log(err);
            this.ErrForm = true ; 
          },
      });
    
  }
  
  cancel() {
    this.router.navigate(['/create/','education']);
  }

  delete(id:number,index: number){
    this.api.delete("experience/"+id).subscribe({
      next: (data:any) =>{
        this.ErrDel = false ;
        console.log(data);
        this.data.splice(index, 1);
      },
      error: err =>{ 
        console.log(err);
        this.ErrDel = true ;},
 });
  }

  update(id:number){
   this.form.setValue({
        position : this.data[id].ex_position,
        startDate : this.data[id].ex_startDate,
        finishDate : this.data[id].ex_finishDate,
        companyName : this.data[id].ex_companyName,
        description : this.data[id].ex_description
     
    })
  }

}
