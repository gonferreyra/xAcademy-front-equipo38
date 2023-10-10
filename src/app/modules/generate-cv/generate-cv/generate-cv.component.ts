import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//import { content } from 'html2canvas/dist/types/css/property-descriptors/content';

//import * as html2pdf from 'html2pdf.js';


//import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from "pdfmake/build/vfs_fonts";

//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {
  @ViewChild('impresionPDF')
  impresionPDF!: ElementRef<HTMLElement>;
  id!: string;
  datosCv: any [] = [];
  token:string = "";
  ErrForm:boolean = false;
  ErrDel:boolean = false;
  ErrFoot:boolean = true;

  personData: any = {}; // Almacena los datos de la persona

  dataEducation = [{
    ed_formation: "",
    ed_institution: "",
    ed_location: "",
    ed_startDate: "",
    ed_finishDate: "",
    ed_description: "",
    },
];
  dataCertificate = [{
    ce_id: 0,
    ce_training: "",
    ce_institution: "",
    ce_year: "",
    }];

    
    dataExperience = [{
      ex_position: "",
      ex_startDate: "",
      ex_finishDate: "",
      ex_companyName: "",
      ex_description:"",
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
  exportPDF() {
    
    
    if (this.impresionPDF) {
      html2canvas(this.impresionPDF.nativeElement, { scale: 2 }).then((canvas) => {
        // Aumenta la escala para mejorar la calidad
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
  
        const imageProps = pdf.getImageProperties(imgData);
        const pdfWidth = 210; // Ancho en milímetros para A4
        const pdfHeight = 297; // Altura en milímetros para A4
  
        // Calcula el ancho y alto ajustados para la imagen en el PDF
        const aspectRatio = imageProps.width / imageProps.height;
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth / aspectRatio;
  
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = pdfHeight * aspectRatio;
        }
  
        // Posiciona la imagen a 20px desde la parte superior del PDF
        const x = (pdfWidth - imgWidth) / 2;
        const y = 20;
  
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
  
        pdf.save('CV-Generado.pdf');
      });
    }
  }
}