import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { EstudianteI } from "../../modelos/estudiante.interface";
import { Estudiante_EscuelaI  } from "../../modelos/estudiante_escuela.interface";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { TramitesI } from "../../modelos/tramites.interface";
import { ResponseI } from "../../modelos/response.interface";
import { Router, ActivatedRoute } from "@angular/router";
//import { AlertaService } from "@angular/router";
import Swal from 'sweetalert2';

import { formatDate } from '@angular/common';
import { WhatsAppServiceService } from 'src/app/servicios/whatsappservice/whats-app-service.service';
import { format } from 'date-fns/format';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit{

  private numeroConsecutivo: number = 0; // Inicializamos en 1


  //para los mensajes
  mensajeForm:any;
numCelular: any
  respuesta:any={};


  codigo: string = '';
  correo: any;
  //id_escuela: any = '';
  nombre_escuela: any = '';
  id_estudiante: any = '';//para almacenar el id 
  id_estudiante_escuela: any = '';//para almacenar el id_estudiante_Escuela
  id_carta: any = '';//para almacenar el 
  id_dictamen: any = '';//para almacenar el 
  id_tramite: any = '';//para almacenar el 
  dni: any = '';
  id_hito: any = '';
  id_observacion: any = '';
  estudiante: EstudianteI | null = null;
  //estudiante_escuela: Estudiante_EscuelaI | null = null;

  buscarForm = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(8)])
  })

  nuevoForm = new FormGroup({
    //para el estudiante
    id_estudiante: new FormControl({ value: '', disabled: true }),
    codigo: new FormControl({ value: '', disabled: true }),
    dni: new FormControl({value: '', disabled: true }),
    nombre: new FormControl({value: '', disabled: true }),
    apellido: new FormControl({value: '', disabled: true }),
    direccion: new FormControl('', [Validators.required]),
    nro_celular: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]),
    sexo: new FormControl({value: '', disabled: true }),
    // correo: new FormControl('', [Validators.required]),
    //para el año de trabajo
    anio: new FormControl(''),
    estado: new FormControl(''),
    //para la carta y dictamen
    fecha: new FormControl(''),
    fecha_grados_titulos: new FormControl(''),
    nro_correlativo_carta: new FormControl(''),
    nro_correlativo_dictamen: new FormControl(''),
    detalle: new FormControl(''),
    
    //para la escuela
    id_escuela: new FormControl(''),
    escuela: new FormControl({value: '', disabled: true }),
    facultad: new FormControl({value: '', disabled: true }),
    //para el tramite
    codtramite: new FormControl('', [Validators.required]),
    fechatramite: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),

    token: new FormControl('')
  });

  //

  estado: any = 'ninguno'

  constructor(private api: ApiService, private apiLocal: ApiLocalService, private router:Router, private whatsappSvc: WhatsAppServiceService,  private fb:FormBuilder) {
    this.mensajeForm = fb.group({
    
      // phone:['', [Validators.required]],
      message:['', [Validators.required]],


    })  

  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token': token
    });

    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);

  }

  //para el buscador
  buscarEstudiante(): void {
    if (this.codigo) {
      this.api.getEstudiante(this.codigo).subscribe((data: EstudianteI) => {
        if (data) {
          //console.log(data)
          this.estudiante = data;
          this.nombre_escuela = data.escuela;
          this.dni = data.dni;
          this.correo = data.codigo
          //console.log("del estudainte",this.estudiante)
          this.nuevoForm.patchValue({
            id_estudiante: data.id_estudiante,
            codigo: data.codigo,
            dni: data.dni,
            nombre: data.nombre,
            apellido: data.apellido,
            sexo: data.sexo,
            escuela: data.escuela,
            facultad: data.facultad,
          });
          this.estado = 'true'
          Swal.fire({
            toast: true,
            title: 'Estudiante ' + data.nombre+ ' fue encontrado',
            icon: 'success',
            iconColor: '#ffffff',
            customClass: 'bg-success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          // No se encontró ningún estudiante con el código proporcionado
          this.estudiante = null;
        }
      }, error => {
        // console.error(error);
        this.estado = 'false'
        Swal.fire({
          toast: true,
          title: 'Lo sentimos, no encontramos al estudiante o este estudiante no existe',
          icon: 'error',
          iconColor: '#ffffff',
          customClass: 'bg-danger',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario
      });
    }
  }

  //para mandar y guardar
  postForm(form: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
 

    swalWithBootstrapButtons.fire({
      title: 'Quieres agregar nuevo tramite?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Registrar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          title: 'Tramite Registrado',
          icon: 'success',
          iconColor: '#ffffff',
          customClass: 'bg-success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });      
        this.postEstudiante();

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
      }
    })

    //this.postAñoTrabajo();
  }


  //para guardar el estudiante
  postEstudiante(){
    //const codigo = this.nuevoForm.get('codigo')?.value;
    const nombre = this.nuevoForm.get('nombre')?.value;
    const apellido = this.nuevoForm.get('apellido')?.value;
    const dni = this.nuevoForm.get('dni')?.value;
    const direccion = this.nuevoForm.get('direccion')?.value;
    const nrocelular = this.nuevoForm.get('nro_celular')?.value;
    this.numCelular = '51'+nrocelular;
    const sexo = this.nuevoForm.get('sexo')?.value;
    // const correo = this.nuevoForm.get('correo')?.value;
    const token = this.nuevoForm.get('token')?.value;

    //preguntamos si el estudiante existe 
    //ESTO ESTA PROBOCANDO EL BUG
    this.apiLocal.getIdEstudiante(dni).subscribe((data) =>{
      if (Array.isArray(data) && data.length > 0) {
        
        // console.log("se pasa algo raro  ")

    
        this.id_estudiante = data[0].id_estudiante;
        //console.log("este es el id del estudiante y si existe",this.id_estudiante);
        this.postEstudiante_escuela(this.nombre_escuela);

      }else{
        //guardo el codigo del estudiante
        const formData = {
          //...this.nuevoForm.value,
          //codigo,
          nombre,
          apellido,
          dni,
          direccion,
          nrocelular,
          sexo,
          // correo,
          token
        };

        //console.log("el estudiante no existe, por lo tanto se guarda",this.nombre_escuela);
        console.log("se tiene que guardar ")

        this.apiLocal.postEstudiante(formData).subscribe(data =>{
          const dni = this.nuevoForm.get('dni')?.value;

          this.apiLocal.getIdEstudiante(dni).subscribe((data) =>{
            if (Array.isArray(data) && data.length > 0) {
              this.id_estudiante = data[0].id_estudiante;//obtengo el id del estudiante agregado
              this.postEstudiante_escuela(this.nombre_escuela);
              console.log("Algo esta pasando ")

            }
          });
          //console.log(this.nombre_escuela)


        });
      }
    });
    
  }

  //para guardar el estudiante_escuela
  postEstudiante_escuela(nombre_escuela:any){
    //pregunro si ya existe un escuela_estudiante registrado
    this.apiLocal.getDetalle_Estudiante_Escuela(this.id_estudiante).subscribe((data) =>{
      if (Array.isArray(data) && data.length > 0) {
        console.log("se tiene que guardar ")

        //si existe
        const existeNombreEscuela = data.some(item => item.nombre === this.nombre_escuela);

        if(existeNombreEscuela){

          const primerCoincidencia = data.find(estudiante => this.estudiante.codigo === estudiante.codigo);

          if (primerCoincidencia) {
            // const idEstudiante = primerCoincidencia.id_estudiante;
            console.log('si existe coincidencioa', primerCoincidencia);
            this.id_estudiante_escuela = primerCoincidencia.id_estudiante_escuela;
            this.postAñoTrabajo();

          }

                  //console.log("id estudiante escuela: ",this.id_estudiante_escuela);
                  //console.log("id nombre carrera: ",this.nombre_escuela);

        }else{
          console.log("este estudiante tiene otra carrera y por ende se guardara con el id de otra carrera")
          
          this.apiLocal.getidEscuela(nombre_escuela).subscribe((data) =>{
          
            if (Array.isArray(data) && data.length > 0) {
              const id_escuela = data[0].id_escuela;
              // console.log(id_escuela);
              //traer el mismo id del estudiante de la base de dartos grados y titulos
              this.apiLocal.getIdEstudiante(this.dni).subscribe((data) =>{
                if (Array.isArray(data) && data.length > 0) {
                  const id_estudiante = data[0].id_estudiante;
                  const codigo = this.nuevoForm.get('codigo')?.value;
                  const token = this.nuevoForm.get('token')?.value;
                  const correo = this.correo + '@unamba.edu.pe'
                  
                  const formData = {
                    id_estudiante,
                    id_escuela,
                    codigo,
                    correo,
                    token
                  };


                  //console.log(formData);
                  this.apiLocal.postEstudiante_Escuela(formData).subscribe(data =>{
                    console.log("se guardo");
                    //obtengo el id del estudiante_escuela
                    this.apiLocal.getDetalle_Estudiante_Escuela(this.id_estudiante).subscribe((data) =>{
                      if (Array.isArray(data) && data.length > 0) {
                        const primerCoincidencia = data.find(estudiante => this.estudiante.codigo === estudiante.codigo);

                        if (primerCoincidencia) {
                          // const idEstudiante = primerCoincidencia.id_estudiante;
                          console.log('si existe coincidencioa', primerCoincidencia);
                          this.id_estudiante_escuela = primerCoincidencia.id_estudiante_escuela;
                          this.postAñoTrabajo();

                        }
                        // this.postAñoTrabajo();

                      }
                    });
                    //this.postAñoTrabajo();
                  });

                }
              });

            }
        
          });

      
        }
        //console.log("datos del estudiante escuela: ",data[0]);

      } else {
        // Si no está relacionado, lo guardamos en la tabla postEstudiante_Escuela
        console.log("se tiene que guardar ")
        this.apiLocal.getidEscuela(nombre_escuela).subscribe((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const id_escuela = data[0].id_escuela;
            // Obtener el ID del estudiante de la tabla grados y títulos
            this.apiLocal.getIdEstudiante(this.dni).subscribe((data) => {
              if (Array.isArray(data) && data.length > 0) {
                const id_estudiante = data[0].id_estudiante;
                const token = this.nuevoForm.get('token')?.value;
                const codigo = this.nuevoForm.get('codigo')?.value;
                const correo = this.correo + '@unamba.edu.pe'

                const formData = {
                  id_estudiante,
                  codigo,
                  id_escuela,
                  correo,
                  token
                };
  
                // Guardar al estudiante en postEstudiante_Escuela
                this.apiLocal.postEstudiante_Escuela(formData).subscribe((data) => {
                  console.log("Estudiante guardado en postEstudiante_Escuela");
                  // Obtener el ID del estudiante_escuela después de guardarlo
                  this.apiLocal.getDetalle_Estudiante_Escuela(this.id_estudiante).subscribe((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                      this.id_estudiante_escuela = data[0].id_estudiante_escuela;
                      this.postAñoTrabajo();
                    }
                  });
                });
              }
            });
          }
        });
      }

    }); 
  }

  
  //para guardar la carta 
  postCarta(){
    this.apiLocal.getIdAnio_Trabajo().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const id_anio_trabajo = data[0].id_anio_trabajo; 

        const nro_correlativo = '';
        const detalle = 'AQUI ENTRARA MAS TEXTO SI LO AMERITA';
        const token = this.nuevoForm.get('token')?.value;

        const formData4 = {
          id_anio_trabajo,
          nro_correlativo,
          detalle,
          token
        };

        //console.log(formData4)

        this.apiLocal.postCarta(formData4).subscribe(data =>{
          //para obtener el id de la carta
          this.apiLocal.getNroCorrelativo_Carta().subscribe((data) => {
            if (Array.isArray(data) && data.length > 0) {
              this.id_carta = data[0].id_carta;
              //console.log(this.id_carta);
              this.postDictamen();

            }
          });  
        }); 

      }


      
    });
  }
  //para guardar la carta 
  postDictamen(){
    this.apiLocal.getIdAnio_Trabajo().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const id_anio_trabajo = data[0].id_anio_trabajo; 

        this.apiLocal.getNroCorrelativo_Dictamen().subscribe((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const nro_correlativo_dictamen_actual = data[0].nro_correlativo.match(/^\d+/);

            const fechaActual = new Date(); // Obtener la fecha actual
            let añoExtraido: any
            const añoActual = fechaActual.getFullYear().toString(); // Obtener el año actual como cadena
            const yearRegex = /\d{4}/; // Expresión regular para coincidir con un año de cuatro dígitos
            const añoAlmacenado = data[0].nro_correlativo.match(yearRegex); // Buscar el año en la cadena
    
            if (añoAlmacenado) {
              añoExtraido = añoAlmacenado[0]; // Obtener el año extraído
              console.log(añoExtraido); // Aquí obtienes el año extraído
              console.log("año actual:"+añoActual, "año de base de datos:"+añoExtraido)
    
            }
    
            if(añoExtraido === añoActual){
              if (nro_correlativo_dictamen_actual) {
                const numeroConsecutivo = parseInt(nro_correlativo_dictamen_actual[0], 10) + 1; // Incrementar el número actual
                const numeroConsecutivoStr = this.padNumber(numeroConsecutivo, 3); // Convertir a cadena con ceros a la izquierda
                const añoActual = new Date().getFullYear();
      
                // Construye el nuevo año y el estado ´´
                
                const nro_correlativo = `${numeroConsecutivoStr}-${añoActual}-UGT-FI-UNAMBA`;
                const detalle = 'AQUI ENTRARA MAS TEXTO SI LO AMERITA';
                const token = this.nuevoForm.get('token')?.value;
                const id_plan_estudio = '0';
      
                const formData5 = {
                  id_anio_trabajo,
                  id_plan_estudio,
                  nro_correlativo,
                  detalle,
                  token
                };
      
                //console.log(formData4)
  
                this.apiLocal.postDictamen(formData5).subscribe(data =>{
                  //para obtener el id de la carta
                  this.apiLocal.getNroCorrelativo_Dictamen().subscribe((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                      this.id_dictamen = data[0].id_dictamen;
                      //console.log("id del dictamen:",this.id_dictamen);
                      this.postTramite();
  
                    }
                  }); 
  
                });  
      
              }
            } else {
              // No se encontró un registro existente en la base de datos, crea uno nuevo.
              const numeroConsecutivoStr = '001'; // Primer número consecutivo
              const añoActual = new Date().getFullYear();
              const nro_correlativo = `${numeroConsecutivoStr}-${añoActual}-UGT-FI-UNAMBA`;
              const detalle = 'AQUI ENTRARA MAS TEXTO SI LO AMERITA';
              const token = this.nuevoForm.get('token')?.value;
              const id_plan_estudio = '0';

      
              const formData5 = {
                id_anio_trabajo,
                id_plan_estudio,
                nro_correlativo,
                detalle,
                token
              };
              this.apiLocal.postDictamen(formData5).subscribe(data =>{
                this.apiLocal.getNroCorrelativo_Dictamen().subscribe((data) => {
                  if (Array.isArray(data) && data.length > 0) {
                    this.id_dictamen = data[0].id_dictamen;
                    //console.log("id del dictamen:",this.id_dictamen);
                    this.postTramite();

                  }
                }); 

              }); 
            }
          } else {
            // No hay registros de año de trabajo en la base de datos, crea uno nuevo.
            // No se encontró un registro existente en la base de datos, crea uno nuevo.
            const numeroConsecutivoStr = '001'; // Primer número consecutivo
            const añoActual = new Date().getFullYear();
            const nro_correlativo = `${numeroConsecutivoStr}-${añoActual}-UGT-FI-UNAMBA`;
            const id_plan_estudio = '0';
            const detalle = 'AQUI ENTRARA MAS TEXTO SI LO AMERITA';
            const token = this.nuevoForm.get('token')?.value;

            const formData4 = {
              id_anio_trabajo,
              id_plan_estudio,
              nro_correlativo,
              detalle,
              token
            };
            this.apiLocal.postDictamen(formData4).subscribe(data =>{
              this.apiLocal.getNroCorrelativo_Dictamen().subscribe((data) => {
                if (Array.isArray(data) && data.length > 0) {
                  this.id_dictamen = data[0].id_dictamen;
                  //console.log("id del dictamen:",this.id_dictamen);
                  this.postTramite();

                }
              }); 

            }); 
          }

        });

      }


      
    });
  }

  //para el plan de estudio
  

  //para guardar el año de trabajo

  

  postAñoTrabajo() { 

    this.apiLocal.getNumeroAnio().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const numeroActual = data[0].anio.match(/^\d+/);

        const fechaActual = new Date(); // Obtener la fecha actual
        let añoExtraido: any
        const añoActual = fechaActual.getFullYear().toString(); // Obtener el año actual como cadena
        const yearRegex = /\d{4}/; // Expresión regular para coincidir con un año de cuatro dígitos
        const añoAlmacenado = data[0].anio.match(yearRegex); // Buscar el año en la cadena

        if (añoAlmacenado) {
          añoExtraido = añoAlmacenado[0]; // Obtener el año extraído
          console.log(añoExtraido); // Aquí obtienes el año extraído
          console.log("año actual:"+añoActual, "año de base de datos:"+añoExtraido)

        }

        if(añoExtraido === añoActual){
          if (numeroActual) {
            const numeroConsecutivo = parseInt(numeroActual[0], 10) + 1;
            const numeroConsecutivoStr = this.padNumber(numeroConsecutivo, 3);
            const añoActual = new Date().getFullYear();
            const anio = `${numeroConsecutivoStr}-${añoActual}-UGyT-UNAMBA`;
            const estado = 'abierto';
            const token = this.nuevoForm.get('token')?.value;
  
            const formData3 = {
              anio,
              estado,
              token
            };
  
            this.apiLocal.postAnioTrabajo(formData3).subscribe(() => {
              this.postCarta();
              //this.postDictamen();
            });
          } 
        }else {
          // No se encontró un registro existente en la base de datos, crea uno nuevo.
          const numeroConsecutivoStr = '001'; // Primer número consecutivo
          const añoActual = new Date().getFullYear();
          const anio = `${numeroConsecutivoStr}-${añoActual}-UGyT-UNAMBA`;
          const estado = 'abierto';
          const token = this.nuevoForm.get('token')?.value;

          const formData3 = {
            anio,
            estado,
            token
          };

          this.apiLocal.postAnioTrabajo(formData3).subscribe(() => {
            this.postCarta();
            //this.postDictamen();
          });
        }



      } else {
        // No hay registros de año de trabajo en la base de datos, crea uno nuevo.
        const numeroConsecutivoStr = '001'; // Primer número consecutivo
        const añoActual = new Date().getFullYear();
        const anio = `${numeroConsecutivoStr}-${añoActual}-UGyT-UNAMBA`;
        const estado = 'abierto';
        const token = this.nuevoForm.get('token')?.value;

        const formData3 = {
          anio,
          estado,
          token
        };

        this.apiLocal.postAnioTrabajo(formData3).subscribe(() => {
          this.postCarta();
          //this.postDictamen();
          
        });
      }
    });
 
  }
  
  //para guardar el tramite
  postTramite(){

    const codtramite = this.nuevoForm.get('codtramite')?.value;
    const tipo = this.nuevoForm.get('tipo')?.value;
    const id_carta = this.id_carta;
    const id_dictamen = this.id_dictamen;
    const id_estudiante_escuela = this.id_estudiante_escuela;
    const token = this.nuevoForm.get('token')?.value;

    const formData = {
      //...this.nuevoForm.value,
      codtramite,
      id_carta,
      id_dictamen,
      id_estudiante_escuela,
      tipo,
      token
    };

    // console.log("formulario que se mandara al tramite: ", formData)

    this.apiLocal.postTramite(formData).subscribe(data =>{
      //console.log("se guardo correctamente: ", formData);
      this.apiLocal.getTramite().subscribe(data =>{
        if (Array.isArray(data) && data.length > 0) {
          this.id_tramite = data[0].id_tramite;

          console.log("el id del tramite es: ", this.id_tramite)

          this.postHito();
        }
      });
      //this.postHito();

      //this.salir();
    });

  }
  // Función para agregar ceros a la izquierda a un número
  padNumber(number: number, length: number): string {
    return String(number).padStart(length, '0');
  }

  //para guardar el hito 
  postHito(){
    const nro_hito = 2;
    const token = this.nuevoForm.get('token')?.value;

    const formData = {
      //...this.nuevoForm.value,
      //codigo,
      nro_hito,
      token
    };

    this.apiLocal.postHito(formData).subscribe(data =>{
      this.apiLocal.getHito().subscribe(data =>{
        if (Array.isArray(data) && data.length > 0) {
          this.id_hito = data[0].id_hito;
          console.log("el id del hito es: ", this.id_hito);
          this.postObservacion();
        }
      });
    });

  }
  //para guardar el hito 
  postObservacion(){
    const obs_foto = "Por revisar";
    const obs_doc = "Por revisar";
    const otros = "Por pevisar";
    
    const obs_fut = "";
    const obs_constancia_egresado = "";
    const obs_constancia_matricula = "";
    const obs_certificado_estudio = "";
    const obs_constancia_no_adeudar_libros = "";
    const obs_fotogracia = "";
    const obs_copia_legalizada_dni = "";
    const obs_partida_nacimiento = "";
    const obs_comprobante_pago_titulacion = "";
    const obs_comprobante_pago_bachiller = "";
    const obs_copia_certificado_idiomas = "";
    const obs_resolucion_sustentacion_tesis = "";
    const obs_constancia_investigacion = "";
    const obs_constancia_biblioteca = "";
    const obs_cd = "";
    const obs_constancia_no_adeudar_escuela = "";
    const obs_verificacion = "";

    const token = this.nuevoForm.get('token')?.value;

    const formData = {
      //...this.nuevoForm.value,
      //codigo,
      obs_foto,
      obs_doc,
      otros,

      obs_fut,
      obs_constancia_egresado,
      obs_constancia_matricula,
      obs_certificado_estudio,
      obs_constancia_no_adeudar_libros,
      obs_fotogracia,
      obs_copia_legalizada_dni,
      obs_partida_nacimiento,
      obs_comprobante_pago_titulacion,
      obs_comprobante_pago_bachiller,
      obs_copia_certificado_idiomas,
      obs_resolucion_sustentacion_tesis,
      obs_constancia_investigacion,
      obs_constancia_biblioteca,
      obs_cd,
      obs_constancia_no_adeudar_escuela,
      obs_verificacion,
  
  

      token
    };

    this.apiLocal.postObservacion(formData).subscribe(data =>{
      this.apiLocal.getObservacion().subscribe(data =>{
        if (Array.isArray(data) && data.length > 0) {
          this.id_observacion = data[0].id_observacion;
          console.log("el id la observacion es: ", this.id_observacion)
          this.postDetalle_Tramite();
        }
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

formatearFecha(fecha:any) {
  // const meses = [
  //   'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  //   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  // ];

  const fechaPartes = fecha.split(/[\s-:]+/);
  const dia = fechaPartes[2];
  const mes = fechaPartes[1];
  const año = fechaPartes[0];
  
  return `${dia}/${mes}/${año}`;
}
  

  //para el detalle tramite
  postDetalle_Tramite(){


    //const id_tramite = this.id_tramite;
    const id_oficina = "2";
    const id_tramite = this.id_tramite;
    const id_observacion = this.id_observacion;
    const id_hito = this.id_hito;
    const formattedDateTime = new Date().toISOString();
    // const  fechatramite= this.getFormattedDateTime(); // Obtiene fecha y hora formateadas
    // const fechaSeleccionada = this.nuevoForm.value.fechatramite;
    const  fechaSeleccionada= this.nuevoForm.get('fechatramite')?.value; // Obtiene fecha y hora formateadas

    // Formatear la fecha antes de enviarla al servidor
    const fechatramite = this.formatearFecha(fechaSeleccionada);

    console.log(fechatramite)
    const estado = "En proceso";
    const nro_orden = "1";
    const verificacion = "no";
    const token = this.nuevoForm.get('token')?.value;

    const formData = {
      id_tramite,
      id_oficina,
      id_observacion,
      id_hito,
      fechatramite,
      estado,
      nro_orden,
      verificacion,
      token
    };    

    this.apiLocal.postDetalle_Tramite(formData).subscribe(data =>{
      this.postFechaHito()
      this.enviarWhatsapp()
      // console.log("se guardo este tramite con normalidad");
      // Swal.fire({
      //   toast: true,
      //   title: 'Estudiante editado con exito',
      //   icon: 'success',
      //   iconColor: '#ffffff',
      //   customClass: 'bg-success',
      //   position: 'top-end',
      //   showConfirmButton: false,
      //   timer: 3000
      // });
      this.salir();
    });
  }
  
  
  postFechaHito(){


    const id_hito = this.id_hito;
    const id_observacion = this.id_observacion;
    const formattedDateTime = new Date().toISOString();
    const  fecha_hito_1= this.getFormattedDateTime() // Obtiene fecha y hora formateadas
    const fecha_hito_2 = "";
    const fecha_hito_3 = "";
    const fecha_hito_4 = "";
    const token = this.getToken();

    const formData = {
      id_hito,
      fecha_hito_1,
      fecha_hito_2,
      fecha_hito_3,
      fecha_hito_4,
      token
    };    

    this.apiLocal.postFechaHito(formData).subscribe(data =>{
    });

  }


  getToken(){
    return localStorage.getItem('token');
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
      const fechaHoraFormateada =   `${dia}/${mes}/${año} - ${hora}:${minuto}:${segundo}`;
      fechaHoraElement.textContent = fechaHoraFormateada;
    }
  }
  //para redireccionar
  salir(){
    this.router.navigate(['tramites']);
  }

  //para mandar el mensaje
  enviarWhatsapp(){

    let mensajes = 'Tu tramite ya fue registrado, ahora se encuentra en la oficina de Grados y Titulos'

    if (this.numCelular && mensajes ) {
     
      let mensaje={

        message: mensajes,
        phone:this.numCelular
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