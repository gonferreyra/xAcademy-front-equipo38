
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CV Maker';
  @ViewChild('exportacion', { static: true }) el!: ElementRef<HTMLImageElement>;

  exportPDF() {
    
  const pdfContent = document.getElementById('pdf-content');
  if (pdfContent) {
    html2canvas(pdfContent, { scale: 2 }).then((canvas) => {
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
