// import { Component, OnInit } from '@angular/core';
import { Component,ViewChild ,OnInit, ElementRef } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TramiteI } from "../../modelos/tramite.interface";
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import { WhatsAppServiceService } from 'src/app/servicios/whatsappservice/whats-app-service.service';
import { Validators } from '@angular/forms';

import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-revision-tramite',
  templateUrl: './revision-tramite.component.html',
  styleUrls: ['./revision-tramite.component.scss']
})
export class RevisionTramiteComponent implements OnInit{

  //para mandar mensajes individuales
  @ViewChild('miInput') miInput: ElementRef;

  // numero: any;
  // nombre: any;
  // mensaje: any;
  // respuesta:any={};


  //
  dataFechaHito:any
//
currentPage: string = '';
  //para los mensajes
  mensaje: any = ''
  numero: any = ''
  // para la revison de los docs
  obs_foto: any = '';
  obs_doc: any = '';
  otros: any = '';
  obs_fut: any = '';
  obs_constancia_egresado: any = '';
  obs_constancia_matricula: any = '';
  obs_certificado_estudio: any = '';
  obs_constancia_no_adeudar_libros: any = '';
  obs_fotogracia: any = '';
  obs_copia_legalizada_dni: any = '';
  obs_partida_nacimiento: any = '';
  obs_comprobante_pago_titulacion: any = '';
  obs_comprobante_pago_bachiller: any = '';
  obs_copia_certificado_idiomas: any = '';
  obs_resolucion_sustentacion_tesis: any = '';
  obs_constancia_investigacion: any = '';
  obs_constancia_biblioteca: any = '';
  obs_cd: any = '';
  obs_constancia_no_adeudar_escuela: any = '';
  obs_verificacion: any = '';

  ///
  datosTramite!: TramiteI;
  estado: string = 'ninguno'; // Propiedad para enlazar con el radio
  TipoTramite: string = ''; // Propiedad para enlazar con el radio
  mostrarDivObservaciones: boolean = false;

  tramites: TramiteI[] = [];
  id_tramite: any = null;
  id_hito: any = null;
  id_observacion: any = null;
  id_detalle_tramite: any = null;

  radioStates:any = {
    estadoDocumento1: '',
    estadoDocumento2: '',
    estadoDocumento3: '',
    estadoDocumento4: '',
    estadoDocumento5: '',
    estadoDocumento6: '',
    estadoDocumento7: '',
    estadoDocumento8: '',
    estadoDocumento9: '',
    estadoDocumento10: '',
    estadoDocumento11: '',
    estadoDocumento12: '',
    estadoDocumento13: '',
    estadoDocumento14: '',
    estadoDocumento15: '',
    estadoDocumento16: '',
    // ... otros radios
  };


  tramitesForm = new FormGroup({
    ID: new FormControl({ value: '', disabled: true }),
    estado: new FormControl({ value: '', disabled: true }),
    tipo: new FormControl({ value: '', disabled: true }),
    fechatramite: new FormControl({ value: '', disabled: true }),
    codigo: new FormControl({ value: '', disabled: true }),
    nro_orden: new FormControl({ value: '', disabled: true }),
    escuela: new FormControl({ value: '', disabled: true }),
    token: new FormControl('')
  });

  observacionForm = new  FormGroup({
    id_observacion: new FormControl(''),
    obs_foto: new FormControl(''),
    obs_doc: new FormControl(''),
    otros: new FormControl(''),

    //para los que faltan
    obs_fut: new FormControl(''),
    obs_constancia_egresado: new FormControl(''),
    obs_constancia_matricula: new FormControl(''),
    obs_certificado_estudio: new FormControl(''),
    obs_constancia_no_adeudar_libros: new FormControl(''),
    obs_fotogracia: new FormControl(''),
    obs_copia_legalizada_dni: new FormControl(''),
    obs_partida_nacimiento: new FormControl(''),
    obs_comprobante_pago_titulacion: new FormControl(''),
    obs_comprobante_pago_bachiller: new FormControl(''),
    obs_copia_certificado_idiomas: new FormControl(''),
    obs_resolucion_sustentacion_tesis: new FormControl(''),
    obs_constancia_investigacion: new FormControl(''),
    obs_constancia_biblioteca: new FormControl(''),
    obs_cd: new FormControl(''),
    obs_constancia_no_adeudar_escuela: new FormControl(''),
    obs_verificacion: new FormControl(''),
  
    //

    token:new FormControl(''),
  });




  constructor(private api:ApiLocalService, private activatedRoute: ActivatedRoute, private router:Router, private activaterouter:ActivatedRoute, private whatsappSvc: WhatsAppServiceService,  private fb:FormBuilder){ 
    
    this.mensajeForm = fb.group({
    
      // phone:['', [Validators.required]],
      message:[' ', [Validators.required]],


    }) 
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
   }

   private updateBreadcrumb() {
    // Obtener la ruta activa
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Obtener el nombre de la ruta activa
    this.currentPage = route.snapshot.data['title'] || '';
  }



  ngOnInit(): void {
    let tramite_id = this.activaterouter.snapshot.paramMap.get('id');
    this.id_tramite = tramite_id;
    this.getTramite();
    this.traerObservaciones(tramite_id);
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);


  }

  postForm(form: any) {
    let radiosAVerificar: any[] = [];
  
    if (this.TipoTramite === 'Bachiller') {
      // Verificar todos los radios excepto los de Título
      radiosAVerificar = ['estadoDocumento1', 'estadoDocumento2', 'estadoDocumento9', 'estadoDocumento10', 'estadoDocumento3',
      'estadoDocumento4', 'estadoDocumento5', 'estadoDocumento6', 'estadoDocumento7', 'estadoDocumento8', 'estadoDocumento16'];
    } else if (this.TipoTramite === 'Titulo') {
      // Verificar todos los radios excepto los de Bachiller
      radiosAVerificar = ['estadoDocumento11', 'estadoDocumento12', 'estadoDocumento1', 'estadoDocumento2', 'estadoDocumento9',
      'estadoDocumento10', 'estadoDocumento3', 'estadoDocumento4', 'estadoDocumento5', 'estadoDocumento6', 'estadoDocumento7',
      'estadoDocumento13', 'estadoDocumento14', 'estadoDocumento15', 'estadoDocumento15'];
    } else {
      // Verificar todos los radios, ya que no hay restricciones específicas
      radiosAVerificar = [
        'estadoDocumento1', 'estadoDocumento2', /* otros radios de Bachiller */,
        'estadoDocumento11', 'estadoDocumento12', /* otros radios de Título */,
        /* otros radios que no tienen restricciones específicas */
      ];
    }
  
    // Verificar los radios seleccionados
    let radiosIncompletos = false;
    for (const radioName of radiosAVerificar) {
      if (this.radioStates[radioName] === '') {
        radiosIncompletos = true;
        break;
      }
    }
  
    if (radiosIncompletos) {
      Swal.fire({
        toast: true,
        title: '<span style="color: white;">Porfavor! completa el registro antes de guardar</span>',
        color: '#ffffff',
        icon: 'warning',
        iconColor: '#ffffff',
        customClass: 'bg-warning',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });      
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro que registrar la revision?',
        text: "Podrás editar la revison si se requiere :)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Registrar!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            toast: true,
            title: 'Tramite revisado',
            icon: 'success',
            iconColor: '#ffffff',
            customClass: 'bg-success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });      
          
      // Aquí ejecutas putObservacion
      const formData = this.observacionForm.value;
      formData.id_observacion = this.id_observacion;
      formData.token = this.getToken();
  
      // Verifica si los checkboxes están marcados y actualiza los campos correspondientes
      formData.obs_fut = this.radioStates.estadoDocumento1;
      formData.obs_constancia_egresado = this.radioStates.estadoDocumento2;
      formData.obs_constancia_matricula = this.radioStates.estadoDocumento9;
      formData.obs_certificado_estudio = this.radioStates.estadoDocumento10;
      formData.obs_constancia_no_adeudar_libros = this.radioStates.estadoDocumento3;
      formData.obs_constancia_no_adeudar_escuela = this.radioStates.estadoDocumento4;
      formData.obs_fotogracia = this.radioStates.estadoDocumento5;
      formData.obs_copia_legalizada_dni = this.radioStates.estadoDocumento6;
      formData.obs_partida_nacimiento = this.radioStates.estadoDocumento7;
      formData.obs_comprobante_pago_bachiller = this.radioStates.estadoDocumento8;
      formData.obs_comprobante_pago_titulacion = this.radioStates.estadoDocumento11;
      formData.obs_copia_certificado_idiomas = this.radioStates.estadoDocumento12;
      formData.obs_resolucion_sustentacion_tesis = this.radioStates.estadoDocumento13;
      formData.obs_constancia_investigacion = this.radioStates.estadoDocumento14;
      formData.obs_constancia_biblioteca = this.radioStates.estadoDocumento15;
      formData.obs_cd = this.radioStates.estadoDocumento16;
      // formData.obs_fut = this.radioStates.estadoDocumento1;

    
      console.log(formData);

      
      
    
      this.api.putObservacion(formData).subscribe(data => {
        let allRadiosGreen = true;

        if (this.TipoTramite === 'Bachiller') {
          // Verifica solo los radios de Bachiller
          const radiosBachiller =  ['estadoDocumento1', 'estadoDocumento2', 'estadoDocumento9', 'estadoDocumento10', 'estadoDocumento3',
          'estadoDocumento4', 'estadoDocumento5', 'estadoDocumento6', 'estadoDocumento7', 'estadoDocumento8', 'estadoDocumento16'];
          allRadiosGreen = radiosBachiller.every(radioName => this.radioStates[radioName] === '1');
        } else if (this.TipoTramite === 'Titulo') {
          // Verifica solo los radios de Título
          const radiosTitulo = ['estadoDocumento11', 'estadoDocumento12', 'estadoDocumento1', 'estadoDocumento2', 'estadoDocumento9',
          'estadoDocumento10', 'estadoDocumento3', 'estadoDocumento4', 'estadoDocumento5', 'estadoDocumento6', 'estadoDocumento7',
          'estadoDocumento13', 'estadoDocumento14', 'estadoDocumento15', 'estadoDocumento15','estadoDocumento16'];
          allRadiosGreen = radiosTitulo.every(radioName => this.radioStates[radioName] === '1');
        }

        if (allRadiosGreen) {
          // Si todos son 1, actualiza el hito
          const id_hito = this.id_hito;
          const nro_hito = '3';
          const token = this.getToken();
          const hitoData = {
            id_hito,
            nro_hito,
            token
          };

          this.api.putHito(hitoData).subscribe(data => {
            console.log("completados");
            const id_detalle_tramite = this.id_detalle_tramite;
            const estado = 'En proceso';
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
              this.putFechaHito()

            });
          });
        } else {
          // Si hay al menos un radio 0, muestra una alerta
            const id_detalle_tramite = this.id_detalle_tramite;
            const estado = 'Detenido';
            const verificacion = 'observacion';
            const token = this.getToken();
            const formData = {
              id_detalle_tramite,
              estado,
              verificacion,
              token
            };
            this.api.putDetalle_Tramite(formData).subscribe(data => {
              console.log("Detalle Tramite en espera a actualizacion");
              const id_hito = this.id_hito;
              const nro_hito = '2';
             // const token = this.getToken();
              const hitoData = {
                id_hito,
                nro_hito,
                token
              };

              this.api.putHito(hitoData).subscribe(data => {
                this.putFechaHito()

              }, error =>{
                this.putFechaHito()

              });
            }, error =>{
              this.putFechaHito()

            });
          // alert("Existen Observaciones, Contactarce con el estudiante");
        }

      

      });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            toast: true,
            title: '<span style="color: white;">Se cancelo el registro de la revision</span>',
            color: '#ffffff',
            icon: 'warning',
            iconColor: '#ffffff',
            customClass: 'bg-warning',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });    
        }
      })

      


    }
  }
  

 

  mostrarObservaciones(valorRadio: string, radioName: string) {
    this.radioStates[radioName] = valorRadio;
    //console.log("Valores de this.radioStates:", this.radioStates);

  }

  getTramite(){
    let token = this.getToken();

    this.api.getTraer_Tramite(this.id_tramite).subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosTramite = data[0];
        this.numero ="51"+this.datosTramite.nrocelular
        console.log(this.datosTramite)
        this.tramitesForm.setValue({
          'ID': this.id_tramite,
          'estado': this.datosTramite.estado,
          'fechatramite': this.datosTramite.fechatramite,
          'nro_orden': this.datosTramite.nro_orden,
          'tipo': this.datosTramite.tipo,
          'codigo': this.datosTramite.codigo,
          'escuela': this.datosTramite.escuela,
          'token': token
        });
        this.TipoTramite = this.datosTramite.tipo;
      }
    });
  }

  traerObservaciones(id_tramite:any){
    this.api.getObservacion_Hito(id_tramite).subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        //this.datosTramite = data[0];
        //traendo las observaciones:

        this.obs_fut = data[0].obs_fut;
        this.obs_constancia_egresado = data[0].obs_constancia_egresado;
        this.obs_constancia_matricula = data[0].obs_constancia_matricula;
        this.obs_certificado_estudio = data[0].obs_certificado_estudio;
        this.obs_constancia_no_adeudar_libros = data[0].obs_constancia_no_adeudar_libros
        this.obs_fotogracia = data[0].obs_fotogracia
        this.obs_copia_legalizada_dni = data[0].obs_copia_legalizada_dni
        this.obs_partida_nacimiento = data[0].obs_partida_nacimiento
        this.obs_comprobante_pago_titulacion = data[0].obs_comprobante_pago_titulacion
        this.obs_comprobante_pago_bachiller = data[0].obs_comprobante_pago_bachiller
        this.obs_copia_certificado_idiomas = data[0].obs_copia_certificado_idiomas
        this.obs_resolucion_sustentacion_tesis = data[0].obs_resolucion_sustentacion_tesis
        this.obs_constancia_investigacion = data[0].obs_constancia_investigacion
        this.obs_constancia_biblioteca = data[0].obs_constancia_biblioteca
        this.obs_cd = data[0].obs_cd
        this.obs_constancia_no_adeudar_escuela = data[0].obs_constancia_no_adeudar_escuela
        this.obs_verificacion = data[0].obs_verificacion

        //
        this.id_detalle_tramite = data[0].id_detalle_tramite
        this.id_hito = data[0].id_hito
        this.id_observacion = data[0].id_observacion
        this.marcarRadiosConObservaciones();

      }


    });
  }

  //
  marcarRadiosConObservaciones() {
    this.marcarRadioConValor(this.obs_fut, 'estadoDocumento1');
    this.marcarRadioConValor(this.obs_constancia_egresado, 'estadoDocumento2');
    this.marcarRadioConValor(this.obs_constancia_no_adeudar_libros, 'estadoDocumento3');
    this.marcarRadioConValor(this.obs_constancia_no_adeudar_escuela, 'estadoDocumento4');
    this.marcarRadioConValor(this.obs_fotogracia, 'estadoDocumento5');
    this.marcarRadioConValor(this.obs_copia_legalizada_dni, 'estadoDocumento6');
    this.marcarRadioConValor(this.obs_partida_nacimiento, 'estadoDocumento7');
    this.marcarRadioConValor(this.obs_comprobante_pago_bachiller, 'estadoDocumento8');
    this.marcarRadioConValor(this.obs_constancia_matricula, 'estadoDocumento9');
    this.marcarRadioConValor(this.obs_certificado_estudio, 'estadoDocumento10');
    this.marcarRadioConValor(this.obs_comprobante_pago_titulacion, 'estadoDocumento11');
    this.marcarRadioConValor(this.obs_copia_certificado_idiomas, 'estadoDocumento12');
    this.marcarRadioConValor(this.obs_resolucion_sustentacion_tesis, 'estadoDocumento13');
    this.marcarRadioConValor(this.obs_constancia_investigacion, 'estadoDocumento14');
    this.marcarRadioConValor(this.obs_constancia_biblioteca, 'estadoDocumento15');
    this.marcarRadioConValor(this.obs_cd, 'estadoDocumento16');
    // ... marcar otros radios según las observaciones
  }

  marcarRadioConValor(valor: any, nombreRadio: string) {
    if (valor === '1') {
      this.radioStates[nombreRadio] = '1';
    } else if (valor === '0') {
      this.radioStates[nombreRadio] = '0';
    } else {
      this.radioStates[nombreRadio] = '';
    }
  }

  ///

  getToken(){
    return localStorage.getItem('token');
  }


  regresar(){
    this.router.navigate(['tramites']);
  }

  
//feacha en tiempo real
title = 'rastreo';
actualizarFechaHora() {
  const fechaHoraElement = document.getElementById("fechaHora");
  if (fechaHoraElement) {
    const fechaHoraActual = new Date();
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
    const año = fechaHoraActual.getFullYear();
    const hora = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minuto = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundo = String(fechaHoraActual.getSeconds()).padStart(2, '0');
    const fechaHoraFormateada = `${dia}/${mes}/${año} - ${hora}:${minuto}:${segundo}`;
    fechaHoraElement.textContent = fechaHoraFormateada;
  }
}

//para en viar el mensaje 
  //para enviar mensaje por watsap
  mensajeForm:any;

  respuesta:any={};

  getTramitesObservados(){
    
  }

  enviarWhatsapp(){

      let radiosVerdes = true;
    
      // Verificar si hay radios marcados en rojo
      for (const radioName in this.radioStates) {
        if (this.radioStates.hasOwnProperty(radioName)) {
          if (this.radioStates[radioName] === '0') {
            radiosVerdes = false;
            break;
          }
        }
      }
    
      if (radiosVerdes) {
        // Si todos los radios están en verde, mostrar el mensaje "Todo correcto"
        // Swal.fire('Éxito', '¡Todo está correcto!', 'success');
        if (this.numero && this.mensajeForm.value.message ) {
     
          let mensaje={
    
            message:"Sus documentos presentados estan en orden por ende su proceso esta todo correcto, si quieres tener mas informacion venir a la oficina de grados y titulos: ",
            phone:this.numero
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
      } else {
        // Si hay radios marcados en rojo, obtener y mostrar la lista de radios en rojo
        // Filtrar los radios que tienen un estado '0' (rojo) y obtener una lista de nombres personalizados
        const radiosRojo = Object.keys(this.radioStates)
          .filter(radioName => radioName.startsWith('estadoDocumento') && this.radioStates[radioName] === '0')
          .map(radioName => {
            // Aquí puedes personalizar el texto según el nombre del radio
            switch (radioName) {
              case 'estadoDocumento1':
                return 'Fut Completo';
              case 'estadoDocumento2':
                return 'Constancia de Egresado (SSAA actualizado)';
              case 'estadoDocumento3':
                return 'Constancia de NO ADEUDAR libros de la universidad';
              case 'estadoDocumento4':
                return 'Constancia de NO ADEUDAR por la direccion de la Escuela Profecional';
              case 'estadoDocumento5':
                return '03 fotografias, tamaño pasaporte a color fondo blanco terno Azul/blusa blanco (si retoques ni joyas)';
              case 'estadoDocumento6':
                return 'Copia legalizada de DNI (Notario Publico)';
              case 'estadoDocumento7':
                return 'Partida de Nacimiento Original (año fiscal)';
              case 'estadoDocumento8':
                return 'Comprobante de pago por derecho de graduacion Otorgado del Grado Academico de Bachiller';
              case 'estadoDocumento9':
                return 'Constancia de Matricula (SSAA actualizado)';
              case 'estadoDocumento10':
                return 'Certificado de Estudios originales (SSAA actualizado)';
              case 'estadoDocumento11':
                return 'Comprobante de pago por derecho de Titulacion';
              case 'estadoDocumento12':
                return 'Copia fedatada de secretaria general del Certificado de idiomas de la (UNAMBA)';
              case 'estadoDocumento13':
                return 'Resolucion de Consejo de Facultad de Sustentacion de Tesis y Acia (fedatado por el Scre. General de la UNAMBA)';
              case 'estadoDocumento14':
                return 'Constancia emitida por la Unidad de Investigacion de la Facultad (rigurar conformidad de entrega de empastados)';
              case 'estadoDocumento15':
                return 'Constancia emitida pa la Biblioteca central (conformidad de entrega de requisitos Aplicativo Web "Repositorio")';
              case 'estadoDocumento16':
                return 'CD con los Documentos Requeridos';
              // Agrega más casos según sea necesario para los diferentes nombres de radio
              default:
                return radioName; // Otra opción por defecto si no hay una personalización específica
            }
          });

        const radiosRojoList = radiosRojo.join(', ');
                // Swal.fire('Radios en rojo', `Los siguientes radios están marcados en rojo: ${radiosRojoList}`, 'error');
        if (this.numero && this.mensajeForm.value.message ) {
     
          let mensaje={
    
            message:"tienes errores el los documentos: "+radiosRojoList+ " por favor venir a la oficina de grados y titulos para la correccion",
            phone:this.numero
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
    
    



    

  }


  putFechaHito(){
    this.api.getFechaHito(this.id_hito).subscribe(data =>{
      const id_fecha_hito = data[0].id_fecha_hito;
      const fecha_hito_1= data[0].fecha_hito_1 // Obtiene fecha y hora formateadas
      const fecha_hito_2 = this.getFormattedDateTime();
      const fecha_hito_3 = "";
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
        this.enviarWhatsapp()
        this.regresar()

        console.log(formData)
      }, error =>{
        this.enviarWhatsapp()

        this.regresar()

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


  //para mandar mensaje individual
  obtenerContenido(){
    const contenido = this.miInput.nativeElement.value;
    this.mensaje = contenido
    console.log("EL MENSAJE ES : "+ this.mensaje);
    this.miInput.nativeElement.value = ''; // Limpiar el contenido del input

    this.enviarWhatsappPersonalizado();

  }

  enviarWhatsappPersonalizado(){
    let mensaje={
    
      message: this.mensaje,
      phone:this.numero
    }
    this.whatsappSvc.enviarMensaje(mensaje).subscribe(res=>{
    
      console.log(mensaje.message,mensaje.phone)
      this.respuesta = res
      console.log(this.respuesta.responseExSave.error)
      
      if (this.respuesta.responseExSave.error === 'WAIT_LOGIN') {
        Swal.fire('ERROR', 'Debe escanear el codigo QR', 'error');              
      }else if(this.respuesta.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
       
       Swal.fire('ERROR', 'Se cerro la sesion', 'error');
       this.mensaje = ""

      }else{
        Swal.fire({
          toast: true,
          title: 'Mensaje enviado',
          color: '#ffffff',
          icon: 'success',
          iconColor: '#ffffff',
          customClass: 'bg-success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });  
       this.mensaje = ""
      }

    })
  }

}
