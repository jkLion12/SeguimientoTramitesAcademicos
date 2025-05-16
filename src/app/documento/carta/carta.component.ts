import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TramiteI } from "../../modelos/tramite.interface";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  
  idtramite: any = null;
  nro_carta: any = null;
  nro_dictamen: any = null;
  escuela: any = null;
  nombre: any = null;
  tipo: any = null;
  apellido: any = null;
  constructor(private api:ApiLocalService, private activaterouter:ActivatedRoute){}
  
  ngOnInit(): void {
    let tramiteid = this.activaterouter.snapshot.paramMap.get('id');
    this.idtramite = tramiteid;
    this.getNroCarta(this.idtramite)
    this.getEstudiante(this.idtramite)
    this.getNroDictamen(this.idtramite)
  }

  generatePDF(){
    html2canvas(document.getElementById("content")!).then(canvas =>{
      const contentDataURL = canvas.toDataURL('image/png')
      var pdf = new jsPDF('p','mm','a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL,'PNG',0,0,width,height);
      window.open(pdf.output('bloburl'));
    })
  }

  getNroCarta(id_tramite:any){
    this.api.getNroCarta(id_tramite).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        console.log("sus datos son: ", data[0])
        this.nro_carta = data[0].nro_correlativo;
      }
    });
  }
  getNroDictamen(id_tramite:any){
    this.api.getNroDictamen(id_tramite).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        console.log("sus datos son: ", data[0])
        this.nro_dictamen = data[0].nro_correlativo;
      }
    });
  }
  getEstudiante(id_tramite:any){
    this.api.getTraer_Tramite(id_tramite).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        console.log("su nombre es: ", data[0])
        this.nombre = data[0].nombre;
        this.apellido = data[0].apellido;
        this.tipo = data[0].tipo;
        this.escuela = data[0].escuela;
      }
    });
  }

}
