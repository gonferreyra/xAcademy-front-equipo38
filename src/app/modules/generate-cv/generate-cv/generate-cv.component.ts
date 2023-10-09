import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';

//import * as html2pdf from 'html2pdf.js';


//import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from "pdfmake/build/vfs_fonts";
//import html2canvas from 'html2canvas';
//import * as jsPDF from 'jspdf';
//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {
  id!: string;
  datosCv: any [] = [];
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  ErrFoot:boolean = true;

  personData: any = {}; // Almacena los datos de la persona

  dataEducation = [{
    ed_formation: " ",
    ed_institution: " ",
    ed_location: " ",
    ed_startDate: " ",
    ed_finishDate: " ",
    ed_description: " ",
    },
];
  dataCertificate = [{
    ce_id: 0,
    ce_training: " ",
    ce_institution: " ",
    ce_year: " ",
    }];

    
    dataExperience = [{
      ex_position: " ",
      ex_startDate: " ",
      ex_finishDate: " ",
      ex_companyName: " ",
      ex_description:" ",
      }];

  constructor(public api : ApiService,private router: Router) { 
    
  }
  
  ngOnInit(): void {
    const id = localStorage.getItem("id")
        if( id != null){
          this.id= id;
        }
        else{
          this.router.navigate(['/','login']);
        }
        //TABLA PERSON
        this.api.get("person/" + this.id).subscribe({
          next: (response: any) => {
            this.personData = response.person;
          },
          error: err => {
            // Manejar errores aquí si es necesario
          }
        });
        
        // TABLA EDUCATION
        this.api.get("education/"+this.id).subscribe({
          next: (response:any) =>{

           this.dataEducation= [...response.education];
         },
          error: err =>{
         console.log("no llego nada sobre la tabla education");
         },
        });
         // TABLA CERTIFICATE
         this.api.get("certificate/"+this.id).subscribe({
          next: (response:any) =>{
            this.ErrFoot = true ;
            this.dataCertificate = [...response.certificate];
         },
          error: err =>{
            this.ErrFoot = false ; 
         },
     });
          // TABLA EXPERIENCE
          this.api.get("experience/"+this.id).subscribe({
            next: (response:any) =>{
              this.ErrFoot = true ;
             this.dataExperience = [...response.experience];
           },
            error: err =>{
              this.ErrFoot = false ; 
           },
       });
        
  }
  setValue(arg0: { name: any; lastName: any; address: any; email: any; phone: any; }) {
    throw new Error('Method not implemented.');
  }
  /*
    onExportClick(){
      const options={
        filename: 'un nombre.pdf',
        image: { type: 'jpeg'},
        html2canvas: {},
        jsPDF: { orientation: 'landscape'}
      };
    
      const content: Element | null = document.getElementById('contenido-exportar');

      html2pdf()
        .from(content)
        .set(options)
        .save()
    }
  }
*/
}