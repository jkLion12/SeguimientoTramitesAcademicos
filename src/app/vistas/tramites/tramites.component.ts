import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { EstudianteI } from "../../modelos/estudiante.interface";
import { Router } from "@angular/router";
import { TramitesI } from "../../modelos/tramites.interface";
import { TramiteI } from "../../modelos/tramite.interface";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PdfGeneratorServiceService } from '../../servicios/PdfGeneratorService/pdf-generator-service.service'; // Reemplaza 'ruta-a-carta-component' con la ruta correcta
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WhatsAppServiceService } from 'src/app/servicios/whatsappservice/whats-app-service.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss']
})
export class TramitesComponent implements OnInit{

  //
  //para los mensajes
  mensajeForm:any;
numCelular: any
  respuesta:any={};
  //

  id_hito: any;
  id_detalle_tramite: any;
  nro_hito: any;
  esBotonDeshabilitado: any; // Establece esto en true si deseas deshabilitar el botón

  private nro_ito: any;
  dataSource = new MatTableDataSource<TramiteI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //para el filtrado por fecha
  @ViewChild('fechaInicio') fechaInicio: ElementRef;
  @ViewChild('fechaFin') fechaFin: ElementRef;

  tramites: TramiteI[] = [];
  displayedColumns: string[] = ['id_tramite', 'estado', 'verificacion' ,'tipo', 'fechatramite', 'sexo', 'escuela', 'codigo'];


  //editar
  datosTramite!: TramitesI;
  idtramite: any;
  id_tramite: any
  editarForm = new FormGroup({
    id_tramite: new FormControl(''),
    codtramite: new FormControl(''),
    tipo: new FormControl(''),
    token: new FormControl('')
  });

  constructor(private api:ApiLocalService, private router:Router, private pdfGenerator: PdfGeneratorServiceService, private whatsappSvc: WhatsAppServiceService,  private fb:FormBuilder){
    this.mensajeForm = fb.group({
    
      // phone:['', [Validators.required]],
      message:[' ', [Validators.required]],


    })  
  }

  ngOnInit(): void {
    this.getTramites();
  }

  getTramites(){
    this.api.getAllTramites(1).subscribe(data => {
      this.tramites = data;
      console.log(data)
      this.dataSource.data = data; // Actualiza los datos del dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editarTramite(id: any){
    this.idtramite = id;
    let token = this.getToken();
    this.api.getSingleTramite(this.idtramite).subscribe(data =>{
      
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.id_tramite = data[0].id_tramite;
        let contramite = data[0].codtramite;
        let tipo = data[0].tipo;
        this.editarForm.setValue({
          'id_tramite': this.id_tramite,
          'codtramite': contramite,
          'tipo': tipo,
          'token': token     
        }); 
      }
    });
  }

  nuevoTramite(){
    this.router.navigate(['nuevo']);
  }

  eliminarTramite(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')){
      this.api.deleteTramite(id).subscribe(() => {
        // Eliminar el registro del arreglo de tramites
        this.tramites = this.tramites.filter(tramit => tramit.id_tramite !== id);
        // Actualiza el dataSource para que la tabla se refresque
        this.dataSource.data = this.tramites;
      });
    }
  }

  getColumnHeader(column: string): string {
    switch (column) {
      case 'id_tramite':
        return 'ID';
      case 'estado':
        return 'Estado';
      case 'verificacion':
        return 'Revisado';
      case 'tipo':
        return 'Tipo';
      case 'fechatramite':
        return 'Fecha de Registro';
      case 'sexo':
        return 'Género';
      case 'escuela':
        return 'Escuela';
      case 'codigo':
        return 'Código';
      default:
        return column;
    }
  }

  handleKeyup(event: any) {
    const filterValue = event.target.value;
    this.applyFilter(filterValue);
  }
  
  applyFilter(filterValue: any) {
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  revisionTramite(id: any) {
    this.router.navigate(['tramites/revision_tramite', id]);
  }
  

  verDocs(id:any) {
    // Llamar al servicio para generar y descargar el PDF
    this.router.navigate(['tramites/documents', id]);
  }
  
  confirmarRecepcion(id:any, nro:any) {
    // Llamar al servicio para generar y descargar el PDF
    const nrocelular = nro
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
 

    swalWithBootstrapButtons.fire({
      title: 'Quieres confirmar que recibiste el documento? ',
      text: "¡Tranquilo, podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Confirmar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          title: 'Tramite Recibido',
          icon: 'success',
          iconColor: '#ffffff',
          customClass: 'bg-success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });      
        
        this.api.getObservacion_Hito(id).subscribe(data => {
          this.id_hito = data[0].id_hito
          this.id_detalle_tramite = data[0].id_detalle_tramite
          this.id_hito = data[0].id_hito
    
          const id_hito = this.id_hito;
          const nro_hito = '6';
          const token = this.getToken();
          const hitoData = {
            id_hito,
            nro_hito,
            token
          };
    
          this.api.putHito(hitoData).subscribe(data => {
            console.log("completados");
            const id_detalle_tramite = this.id_detalle_tramite;
                const estado = 'Completado';
                const verificacion = 'si';
                const token = this.getToken();
                const formData = {
                  id_detalle_tramite,
                  estado,
                  verificacion,
                  token
                };
            this.api.putDetalle_Tramite(formData).subscribe(data => {
              console.log("Detalle Tramite completado");
              // this.regresar()
              this.putFechaHito(nrocelular)
              this.getTramites();

            });
            
          });
    
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Se canceló el registro</span>',
          color: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
          customClass: 'bg-warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });    
        // this.enviarWhatsapp(nro)

        this.getTramites();

      }
    })

  }
  
  //para el boton de ver docs
  // btn() {
  //   // Verifica si hay al menos un trámite y si la verificación no es 'si'
  //   if (this.tramites.length > 0 && this.tramites[0].verificacion !== 'si') {
  //     this.esBotonDeshabilitado = true;
  //   } else {
  //     this.esBotonDeshabilitado = false;
  //   }
  // }

  //editar fromulario
  putForm(form: any){
    // form.patchValue({
    //   'id_tramite': this.id_tramite
    // })
    this.api.putTramite(form).subscribe(data =>{
      Swal.fire({
        toast: true,
        title: '<span style="color: white;">Tramite Editado</span>',
        color: '#ffffff',
        icon: 'success',
        iconColor: '#ffffff',
        customClass: 'bg-success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }); 
      this.getTramites()      // this.router.navigate(['tramites']);
    });
  }
  
  getToken(){
    return localStorage.getItem('token');
  }


  esRevisado(id: any) {
    const tramite = this.tramites.find(t => t.id_tramite === id);
    return tramite ? tramite.verificacion !== 'si' : false;
  }
  
  enviarWhatsapp(nro:any){

    let mensajes = 'Tu tramite será enviado a la oficina general de Grados y Titulos de la UNAMBA'

    
    if (nro && mensajes ) {
     
      let mensaje={

        message: mensajes,
        phone: "51"+nro
      }
  
      this.whatsappSvc.enviarMensaje(mensaje).subscribe(res=>{

        console.log(mensaje.message,mensaje.phone)
        this.respuesta = res
        console.log(this.respuesta.responseExSave.error)
        
        if (this.respuesta.responseExSave.error === 'WAIT_LOGIN') {
          Swal.fire('ERROR', 'Debe escanear el codigo QR', 'error');              
        }else if(this.respuesta.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
         
         Swal.fire('ERROR', 'Se cerro la sesion', 'error');
         this.mensajeForm.reset();

        }else{
         Swal.fire('Exito', 'Mensaje enviado', 'success');
         this.mensajeForm.reset();
        }

      })
  
      
    }else{


      Swal.fire('ERROR', 'Debe llenar todos los campos', 'error');


    }  
    

  }


  putFechaHito(nro_celular: any){
    this.api.getFechaHito(this.id_hito).subscribe(data =>{
      const id_fecha_hito = data[0].id_fecha_hito;
      const fecha_hito_1= data[0].fecha_hito_1 // Obtiene fecha y hora formateadas
      const fecha_hito_2 = data[0].fecha_hito_2;
      const fecha_hito_3 = this.getFormattedDateTime();
      const fecha_hito_4 = "";
      const token = this.getToken();

      const formData = {
        id_fecha_hito,
        fecha_hito_1,
        fecha_hito_2,
        fecha_hito_3,
        fecha_hito_4,
        token
      };


      this.api.putFechaHito(formData).subscribe(data =>{
        this.enviarWhatsapp(nro_celular)

        console.log(formData)
      });

    });
    
    
  }

  //para el formato hora y fecha
  getFormattedDateTime(): string {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, 'dd/MM/yyyy', 'en-US');
    const formattedTime = formatDate(currentDate, 'hh:mm a', 'en-US');
    return formattedDate + ' ' + formattedTime;
  }

  //para el filtrado por fecha
  filtrarDatos(fechaInicio: string, fechaFin: string) {
    const fechaInicioParts = fechaInicio.split('/');
    const fechaFinParts = fechaFin.split('/');

    let fechaInicioTimestamp = new Date(`${fechaInicioParts[2]}-${fechaInicioParts[1]}-${fechaInicioParts[0]}`).getTime();
    const fechaFinTimestamp = new Date(`${fechaFinParts[2]}-${fechaFinParts[1]}-${fechaFinParts[0]}`).getTime();

    // Ajuste para incluir los datos que coinciden con la fecha de inicio y dentro del rango
    fechaInicioTimestamp -= 86400000; // Sumamos un día en milisegundos para incluir la fecha de inicio

    // Filtrar los datos según las fechas seleccionadas
    this.dataSource.data = this.tramites.filter(tramite => {
      const tramiteFechaParts = tramite.fechatramite.split('/');
      const tramiteTimestamp = new Date(`${tramiteFechaParts[2]}-${tramiteFechaParts[1]}-${tramiteFechaParts[0]}`).getTime();
      return tramiteTimestamp >= fechaInicioTimestamp && tramiteTimestamp <= fechaFinTimestamp;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reestablecerTabla(){
    this.getTramites();
    this.fechaInicio.nativeElement.value = ''; // Limpiar el contenido del input
    this.fechaFin.nativeElement.value = ''; // Limpiar el contenido del input

  }

  // exportToExcel(): void {
  //   const data = this.dataSource.data.map(item => ({ ...item }));
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'Tramites');
  // }
  
  exportToExcel(): void {
    const data = this.dataSource.data.map(item => {
      const rowData: any = {};
      this.displayedColumns.forEach(column => {
        rowData[this.getColumnHeader(column)] = item[column];
      });
      return rowData;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Tramites');
  }
  

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

}
