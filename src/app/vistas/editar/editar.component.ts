import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TramitesI } from "../../modelos/tramites.interface";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  tramite: TramitesI[] = [];
  idtramite: any = null;

  constructor(private activaterouter:ActivatedRoute, private router:Router, private api:ApiLocalService){

  }
  datosTramite!: TramitesI;
  editarForm = new FormGroup({
    ID: new FormControl(''),
    codtramite: new FormControl(''),
    id_carta: new FormControl({ value: '', disabled: true }),
    id_dictamen: new FormControl({ value: '', disabled: true }),
    id_estudiante_escuela: new FormControl({ value: '', disabled: true }),
    tipo: new FormControl(''),
    token: new FormControl('')
  });

  ngOnInit(): void {
    let tramiteid = this.activaterouter.snapshot.paramMap.get('id');
    this.idtramite = tramiteid;
    let token = this.getToken();
    this.api.getSingleTramite(tramiteid).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosTramite = data[0];
        this.editarForm.setValue({
          'ID': tramiteid,
          'codtramite': this.datosTramite.codtramite,
          'id_carta': this.datosTramite.id_carta,
          'id_dictamen': this.datosTramite.id_dictamen,
          'id_estudiante_escuela': this.datosTramite.id_estudiante_escuela,
          'tipo': this.datosTramite.tipo,
          'token': token     
        });
      } 
      //console.log(this.editarForm.value);
    });
  }

  regresar(){
    this.router.navigate(['tramites']);
  }

  getToken(){
    return localStorage.getItem('token');
  }


  postForm(form: any){
    this.api.putTramite(form).subscribe(data =>{
      console.log(data);
      this.router.navigate(['tramites']);
    });
  }
  
  eliminarTramite() {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')){
      this.api.deleteTramite(this.idtramite).subscribe(() => {
        // Eliminar el registro de la lista de personas en el frontend
        this.tramite = this.tramite.filter(tramit => tramit.ID !== this.idtramite);
        this.router.navigate(['tramites']);
      });
    }
  }

}
