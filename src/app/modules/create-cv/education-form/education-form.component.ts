import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {

  form:UntypedFormGroup;
  formation = new UntypedFormControl('', [Validators.required]);
  institution = new UntypedFormControl('', [Validators.required]);
  location = new UntypedFormControl('', [Validators.required]);
  startDate = new UntypedFormControl('', [Validators.required]);
  finishDate = new UntypedFormControl('', [Validators.required]);
  description = new UntypedFormControl('', [Validators.required]);
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  ErrFoot:boolean = true;
  SvForm:boolean = false;
  id!: string;
  
  data = [{
    ed_id: 1,
    ed_formation: "dummy",
    ed_institution: "dummy",
    ed_location: "dummy",
    ed_startDate: "Invalid date",
    ed_finishDate: "Invalid date",
    ed_description: "dummy",
    ed_fk_user: "1"
    },
];



  constructor(public api : ApiService,private formBuilder: UntypedFormBuilder, private router: Router) { 
    this.form = this.formBuilder.group({
      formation: this.formation,
      institution: this.institution,
      location:this.location,
      startDate:this.startDate,
      finishDate:this.finishDate,
      description:this.description
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

    this.api.get("education/"+this.id).subscribe({
      next: (response:any) =>{
        this.ErrFoot = true ;
       this.data = [...response.education];
     },
      error: err =>{
      this.ErrFoot = false ; 
     }})
  
  
  }

  save() {
    let FormRaw = this.form.getRawValue();
    const token = localStorage.getItem("Token");   //descomentar para usar con TOKEN
      if(!token){
        this.router.navigate(['/','login']);
      }
    this.api.setHeader("Authorization","Bearer "+ token);
    
    this.api.post("education/new/"+this.id,FormRaw).subscribe({
           next: (data:any) =>{
            this.ErrForm = false ;
            this.SvForm = true ; 
            this.data.push(data.newEducation);
          },
           error: err =>{
            this.ErrForm = true ;
           
          },
      });
  }
  
  cancel() {
    this.router.navigate(['/create/','person']);
  }

  delete(id:number,index:number){
    this.api.delete("education/"+id).subscribe({
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
    formation : this.data[id].ed_formation,
    institution : this.data[id].ed_institution,
    location : this.data[id].ed_location,
    startDate : this.data[id].ed_startDate,
    finishDate : this.data[id].ed_finishDate,
    description : this.data[id].ed_description
     
    })
  }


}
