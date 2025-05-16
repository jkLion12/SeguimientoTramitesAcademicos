import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { DatePipe } from '@angular/common';


import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  //para guardar documentos
  id_dictamen_new: any
  nombre_documento: string = '';
  descripcion: string = '';
  //editar
  id_documento:any
  nombre_documento_edit: string = ''
  descripcion_edit: string = ''
  estado_edit: any = 'nuevo'
  //para mostrar documentos
  dataDocuments: any;
  //


  currentPage: string = '';
  //aux borrar si es necesario
  aux: any = '';

  //
  estudios_generales:any;
  estudios_esfecificos:any;
  estudios_especialidad:any;
  practicas_preprofecionales:any;
  total:any;

  //
  nombre_plan_estudio: any ='prueba'
  //para el pdf
  pdfBlobRojo: Blob | undefined;
  pdfBlobAzul: Blob | undefined;
  pdfUrlRojo: SafeResourceUrl | undefined;
  pdfUrlAzul: SafeResourceUrl | undefined;

  //para la animacion
  isLeftFocused: boolean = false;
  isRightFocused: boolean = false;

  //dictamen
  id_dictamen: any

  idtramite: any = null;
  nro_carta: any = null;
  nro_dictamen: any = null;
  escuela: any = null;
  nombre: any = null;
  tipo: any = null;
  apellido: any = null;
  id_carta: any = '';
  id_plan_estudio: any = '';
  codtramite: any = ''
  fechatramite:any =''
  fechaingreso: any = ''
  fechaingreso2: any = ''
//
  nroCarta: string = ''; // Variable para almacenar el valor del input
  dataPlan_estudio: any
  detallePlan_estudio: any
//
  // nro_dictamen: any = null;
  estado: string = 'ninguno';
  anioActual: any = '';

  //
  selectedPlan: string = ''; // Declaración de la variable para almacenar el valor seleccionado
  disimiss: string;
  //para la carta
  // nrocarta: any = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api:ApiLocalService, private activaterouter:ActivatedRoute, private sanitizer: DomSanitizer){
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
  //para la carta
  ngOnInit(): void {

    Swal.fire({
      toast: true,
      title: '<span style="color: white;">Porfavor, Revise bien los documentos antes de Imprimir o Guardar, Esto es muy importante</span>',
      color: '#ffffff',
      icon: 'warning',
      iconColor: '#ffffff',
      customClass: 'bg-warning',
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    });    

        this.anioActual = new Date().getFullYear().toString();
    console.log(this.anioActual)
    //para la carta
    let tramiteid = this.activaterouter.snapshot.paramMap.get('id');
    this.idtramite = tramiteid;
    this.getNroCarta(this.idtramite)
    this.getEstudiante(this.idtramite)
    this.getNroDictamen(this.idtramite)
    this.getPlanEstudio()
    
  }




  getNroCarta(id_tramite:any){
    this.api.getNroCarta(id_tramite).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        console.log("sus datos son: ", data[0])
        this.nro_carta = data[0].nro_correlativo;
        this.id_carta = data[0].id_carta;
      }
    });
  }


  getNroDictamen(id_tramite:any){
    this.api.getNroDictamen(id_tramite).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        console.log("sus datos son: ", data[0])
        this.nro_dictamen = data[0].nro_correlativo;
        this.id_dictamen = data[0].id_dictamen
        this.id_plan_estudio = data[0].id_plan_estudio;
        console.log("id plan estudio",this.id_plan_estudio)
        this.getDocumento(this.id_dictamen)
        this.getDataPlan(this.id_plan_estudio);
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
        this.codtramite = data[0].codtramite;
        this.fechatramite = data[0].fechatramite;
        this.fechaingreso = data[0].fecha_hito_1;
        this.fechaingreso2 = data[0].fecha_hito_2;
        
      }
    });
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

  mostrarDictamenTitulo(valor: string) {
    // this.estado = valor;
    // if (valor === 'rojo') {
    //   this.isLeftFocused = true;
    //   this.isRightFocused = false;
    //   this.createPDFDictamenTitulo()
    //   // Agregar el resto de la lógica para 'rojo'
    // } 

    //
    this.estado = valor;
    if (valor === 'rojo') {
      this.isLeftFocused = true;
      this.isRightFocused = false;
      this.createPDFDictamenTitulo()
      // Agregar el resto de la lógica para 'rojo'
    } 

    if(this.id_plan_estudio === '0'){
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Porfavor, Selecciona un plan de estudio</span>',
          color: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
          customClass: 'bg-warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });    
    }
    
  }
  mostrarDictamen(valor: string) {
    this.estado = valor;
    if (valor === 'rojo') {
      this.isLeftFocused = true;
      this.isRightFocused = false;
      this.createPdf()
      // Agregar el resto de la lógica para 'rojo'
    } 

    if(this.id_plan_estudio === '0'){
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Porfavor, Selecciona un plan de estudio</span>',
          color: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
          customClass: 'bg-warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });    
    }
    
  }

  mostrarCarta(valor: string){
    this.estado = valor;
    //poner condiciones
    if (valor === 'carta') {
      this.isLeftFocused = false;
      this.isRightFocused = true;
      this.createBluePdf()
    // Agregar el resto de la lógica para 'azul'
    } 

    if(this.nro_carta === ''){
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Porfavor, Ingresa un numero de carta</span>',
          color: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
          customClass: 'bg-warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });    
      
    }

  }
  //create pdf

  convertImageToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous'); // Evita errores de permisos CORS
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas.toDataURL());
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageUrl;
    });
  }


  // createPdf(){

  //   const pdfDefinition: any = {
  //     content:[
  //       {
  //         text: 'Hola mundo'
  //       }
  //     ]
  //   }

  //   const pdf = pdfMake.createPdf(pdfDefinition);
  //   pdf.open();

  // }

  //para los requisitos
  postDocumento(id:any){
    console.log("id del dictamen",id,this.nombre_documento,this.descripcion);
    const id_dictamen = id
    const nombre = this.nombre_documento;
    const descripcion = this.descripcion;
    const token = this.getToken();
    const formData = {
      id_dictamen,
      nombre,
      descripcion,
      token
    };

    this.api.postDocumento(formData).subscribe(data =>{
      console.log("datos guardados",formData);
      this.getDocumento(id);

      // this.router.navigate(['tramites']);
    });

  }

  getDocumento(id:any){
    this.api.getDocumentos(id).subscribe((data) =>{
      // window.location.reload();
      this.dataDocuments = data
      console.log("data onbtenida",this.dataDocuments);
      this.nombre_documento = ''
      this.descripcion = ''

      // this.router.navigate(['tramites']);
    });

  }

  deleteDocumento(id:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres eliminar este documento?',
      text: "No podras recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteDocumentos(id).subscribe((data) =>{
          // window.location.reload();
          this.getDocumento(this.id_dictamen)
          // this.router.navigate(['tramites']);
        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">No se elimino el registro</span>',
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

  putDocumento(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres ediatar este documento?',
      text: "Podrás editarlo con normalidad mas tarde",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Editar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        
        const id = this.id_documento
        const nombre = this.nombre_documento_edit;
        const descripcion = this.descripcion_edit;
        const token = this.getToken();
        const formData = {
          id,
          nombre,
          descripcion,
          token
        };
        this.api.putDocumento(formData).subscribe((data) =>{
          // window.location.reload();
          this.estado_edit = 'nuevo'
          this.id_documento = ''
          this.nombre_documento_edit = ''
          this.descripcion_edit = ''
      
          this.getDocumento(this.id_dictamen)
          // this.router.navigate(['tramites']);
        }, error =>{
          this.estado_edit='nuevo'
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Se cancelo la edicion</span>',
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

  traerDocumento(id:any, nombre:any, descripcion:any,estado:any){
    this.estado_edit = estado
    this.id_documento = id
    this.nombre_documento_edit = nombre
    this.descripcion_edit = descripcion
    console.log("id_del documentos", this.id_documento, this.nombre_documento_edit, this.descripcion_edit)

    

  }

  cambiarEstado(){
    this.estado_edit = 'nuevo'
  }

  //para los documentos

  createPdf() {
    const imageUrl = '../../../assets/icons/logounamba.png';
    console.log(this.dataDocuments)


    const body = [];
    body.push(['Nombre', 'Descripción']); // Encabezados de la tabla

    this.dataDocuments.forEach(doc => {
      body.push([doc.nombre, doc.descripcion]); // Agrega los datos de cada documento
    });


    this.convertImageToBase64(imageUrl)
      .then((base64Image: string) => {
        const pdfDefinition: any = {
          content: [
            {
              stack: [
                {
                  image: base64Image,
                  width: 200,
                  alignment: 'left'
                },
                {
                  text: 'DICTAMEN '+ this.nro_dictamen,
                  alignment: 'center',
                  fontSize: 12,
                  margin: [0, 10]
                }
              ]
            },
            {
              text: [
                {
                  text: 'La Unidad de Grados y Títulos de la Facultad de Ingeniería, de la Universidad Nacional Micaela Bastidas de Apurímac, conforme a lo establecido en el Reglamento de Grados y Títulos de la Universidad, aprobado con Resolución Nº 130-2021-CU-UNAMBA, de fecha 05 de julio del dos mil veintiuno, Título II, Capítulo I: Del grado académico de bachiller, sobre PROCEDIMIENTO PARA OBTENER EL GRADO ACADÉMICO DE BACHILLER, Arts. 10º, 11º, 12° y 13°. En el Art. 13º indica: La Unidad de Grados y Títulos de la Facultad se responsabiliza de la revisión de los requisitos que contiene el expediente de cada postulante para la Obtención del Grado Académico de Bachiller, con el apoyo de una comisión y Título II, Capítulo I: Del título profesional, sobre PROCEDIMIENTO PARA OBTENER EL TÍTULO PROFESIONAL, Arts. 24º al 39°. En el Art. 29º indica: " + "La Unidad de Grados y Títulos de la Facultad se responsabiliza de la revisión de los requisitos que contiene el expediente de cada postulante para la Obtención del Título Profesional, con el apoyo de una comisión y, de acuerdo al Memorándum Múltiple 008-2021-CU-UNAMBA, en el que se aprueba el retiro de comisiones de apoyo de Grados y Títulos de las Facultades.          En virtud a lo señalado, habiendo recibido el expediente con registro de ingreso N°'+this.codtramite+' de tramite documentario de fecha '+this.fechatramite+' y con registro de ingreso N°012 de la Unidad de Grados y Títulos de la Facultad de Ingeniería de fecha '+ this.fechaingreso +', el expediente del egresado: ',
                  
                },               
                { text: this.nombre + " "+ this.apellido ,bold: true, },
                ", se procedió a la revisión física de requisitos requeridos para obtener el Grado Académico de Bachiller de fecha "+ this.formatearFecha3(this.fechaingreso2) +", que consta de los siguientes documentos:",

              ],

              alignment: 'justify',
              fontSize: 10.5,

              margin: [0, 10]
            },
            {
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 ? '#f2f2f2' : null; // Establece el color de fondo de la fila de encabezado
                }
              },
              table: {
                headerRows: 1,
                widths: ['*', '*'], // Establece que las columnas ocupen todo el ancho de la página
                body: body
              }
            },
            {
              text: 'CONSOLIDADO DE ASIGNATURAS',
              style: 'header'
            },
            {
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 ? '#f2f2f2' : null; // Establece el color de fondo de la fila de encabezado
                }
              },
              table: {
                headerRows: 2,
                widths: ['*', '*', '*'], // Establece que las columnas ocupen todo el ancho de la página
                body: [
                  [
                    { text: 'ASIGNATURAS POR TIPO DE ESTUDIO', rowSpan: 2, bold: true, alignment: 'center' },
                    { text: 'CRÉDITOS', colSpan: 2, bold: true, alignment: 'center' },
                    {}
                  ],
                  [
                    {},
                    { text: 'EXIGIDOS', bold: true, alignment: 'center' },
                    { text: 'APROBADOS', bold: true, alignment: 'center' }
                  ],
                  ['Estudios Generales (AFG)', this.detallePlan_estudio.estudios_generales, this.detallePlan_estudio.estudios_generales],
                  ['Estudios Específicos (AFPO)', this.detallePlan_estudio.estudios_esfecificos, this.detallePlan_estudio.estudios_esfecificos],
                  ['Estudios de Especialidad (AFPE)', this.detallePlan_estudio.estudios_especialidad, this.detallePlan_estudio.estudios_especialidad],
                  ['Practicas Pre Profecionales', this.detallePlan_estudio.practicas_preprofecionales, this.detallePlan_estudio.practicas_preprofecionales],
                  [{ text: 'TOTAL', bold: true, alignment: 'center' }, { text: this.detallePlan_estudio.total, bold: true, alignment: 'center' } , { text: this.detallePlan_estudio.total, bold: true, alignment: 'center' }],
                ]
              }
            },
            {
              style: 'content',
              text: [
                {
                  text: 'Por consiguiente, la Unidad de Grados y Títulos de la Facultad de Ingeniería, conforme al Art. 14° dictamina declarar ',
                  
                },               
                { text: 'APTO y EXPEDITO',bold: true, },
                'el expediente del egresado',
                { text: this.nombre.toUpperCase() +" " + this.apellido.toUpperCase(),bold: true, },
                ' para optar el ',
                { text: "GRADO ACADÉMICO BACHILLER EN " + this.escuela.toUpperCase() ,bold: true, },
                ' debiendo proseguir el trámite respectivo. En señal de conformidad, firma la Unidad de Grados y Títulos de la Facultad de Ingeniería de la Universidad Nacional Micaela Bastidas de Apurímac.',

              ],

              alignment: 'justify',
              fontSize: 10.5,
            },////
            // {
            //   text: 'Por consiguiente, la Unidad de Grados y Títulos de la Facultad de Ingeniería, conforme al Art. 14° dictamina declarar APTO y EXPEDITO el expediente del egresado '+ this.nombre.toUpperCase() + this.apellido.toUpperCase() +' para optar el GRADO ACADÉMICO BACHILLER EN INGENIERÍA DE MINAS debiendo proseguir el trámite respectivo. En señal de conformidad, firma la Unidad de Grados y Títulos de la Facultad de Ingeniería de la Universidad Nacional Micaela Bastidas de Apurímac.',
            //   alignment: 'justify',
            //   fontSize: 10,

            // },///
            {
              text: 'Tamburco, '+this.formatearFecha(this.fechaingreso2),
              alignment: 'right',
              margin: [0, 10]
            }
          ],
          styles: {
            header: {
              fontSize: 14,
              bold: true
            }
          }
        };

        // const pdf = pdfMake.createPdf(pdfDefinition);
        // pdf.open();
        const pdf = pdfMake.createPdf(pdfDefinition);

        // Crear un Blob con el PDF generado
        pdf.getBlob((pdfBlob: Blob) => {
          this.pdfBlobRojo = pdfBlob;
    
          // Crear una URL segura para el Blob del PDF
          this.pdfUrlRojo = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.pdfBlobRojo));
        });
    
        
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
      
  }
  
  createPDFDictamenTitulo() {
    const imageUrl = '../../../assets/icons/logounamba.png';

    const body = [];
    body.push(['Nombre', 'Descripción']); // Encabezados de la tabla

    this.dataDocuments.forEach(doc => {
      body.push([doc.nombre, doc.descripcion]); // Agrega los datos de cada documento
    });


    this.convertImageToBase64(imageUrl)
      .then((base64Image: string) => {
        const pdfDefinition: any = {
          content: [
            {
              stack: [
                {
                  image: base64Image,
                  width: 200,
                  alignment: 'left'
                },
                {
                  text: 'DICTAMEN '+ this.nro_dictamen,
                  alignment: 'center',
                  fontSize: 12,
                  margin: [0, 10]
                }
              ]
            },
            {
              text: [
                {
                  text: 'La Unidad de Grados y Títulos de la Facultad de Ingeniería, de la Universidad Nacional Micaela Bastidas de Apurímac, conforme a lo establecido en el Reglamento de Grados y Títulos de la Universidad, aprobado con Resolución Nº 130-2021-CU-UNAMBA, de fecha 05 de julio del dos mil veintiuno, Título II, Capítulo I: Del grado académico de bachiller, sobre PROCEDIMIENTO PARA OBTENER EL GRADO ACADÉMICO DE BACHILLER, Arts. 10º, 11º, 12° y 13°. En el Art. 13º indica: La Unidad de Grados y Títulos de la Facultad se responsabiliza de la revisión de los requisitos que contiene el expediente de cada postulante para la Obtención del Grado Académico de Bachiller, con el apoyo de una comisión y Título II, Capítulo I: Del título profesional, sobre PROCEDIMIENTO PARA OBTENER EL TÍTULO PROFESIONAL, Arts. 24º al 39°. En el Art. 29º indica: La Unidad de Grados y Títulos de la Facultad se responsabiliza de la revisión de los requisitos que contiene el expediente de cada postulante para la Obtención del Título Profesional, con el apoyo de una comisión y, de acuerdo al Memorándum Múltiple 008-2021-CU-UNAMBA, en el que se aprueba el retiro de comisiones de apoyo de Grados y Títulos de las Facultades.          En virtud a lo señalado, habiendo recibido el expediente con registro de ingreso N°'+this.codtramite+' de tramite documentario de fecha '+this.fechatramite+' y con registro de ingreso N°012 de la Unidad de Grados y Títulos de la Facultad de Ingeniería de fecha '+this.fechaingreso+', el expediente del egresado: ',
                  
                },               
                { text: this.nombre + " "+ this.apellido ,bold: true, },
                ", se procedió a la revisión física de requisitos requeridos para obtener el Grado Académico de Bachiller de fecha "+this.formatearFecha3(this.fechaingreso2)+", que consta de los siguientes documentos:",

              ],

              alignment: 'justify',
              fontSize: 10.5,

              margin: [0, 10]
            },
            {
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 ? '#f2f2f2' : null; // Establece el color de fondo de la fila de encabezado
                }
              },
              table: {
                headerRows: 1,
                widths: ['*', '*'], // Establece que las columnas ocupen todo el ancho de la página
                body: body
              }
            },

            {
              style: 'content',
              text: [
                {
                  text: 'Por consiguiente, la Unidad de Grados y Títulos de la Facultad de Ingeniería, conforme al Art. 14° dictamina declarar ',
                  
                },               
                { text: 'APTO y EXPEDITO',bold: true, },
                'el expediente del egresado',
                { text: this.nombre.toUpperCase() +" " + this.apellido.toUpperCase(),bold: true, },
                ' para optar el ',
                { text: "GRADO ACADÉMICO BACHILLER EN " + this.escuela.toUpperCase() ,bold: true, },
                ' debiendo proseguir el trámite respectivo. En señal de conformidad, firma la Unidad de Grados y Títulos de la Facultad de Ingeniería de la Universidad Nacional Micaela Bastidas de Apurímac.',

              ],

              alignment: 'justify',
              fontSize: 10.5,
            },
            {
              text: 'Tamburco, '+this.formatearFecha(this.fechaingreso2),
              alignment: 'right',
              margin: [0, 10]
            }
          ],
          styles: {
            header: {
              fontSize: 14,
              bold: true
            }
          }
        };

        // const pdf = pdfMake.createPdf(pdfDefinition);
        // pdf.open();
        const pdf = pdfMake.createPdf(pdfDefinition);

        // Crear un Blob con el PDF generado
        pdf.getBlob((pdfBlob: Blob) => {
          this.pdfBlobRojo = pdfBlob;
    
          // Crear una URL segura para el Blob del PDF
          this.pdfUrlRojo = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.pdfBlobRojo));
        });
    
        
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
      
  }

  createBluePdf() {

    const imageUrl = '../../../assets/icons/logoCarta.png'; // Ruta de la imagen, reemplaza con tu URL
    this.convertImageToBase64(imageUrl)
      .then((base64Image: string) => {
        const pdfDefinition: any = {
          content: [
            { image: base64Image, width: 480, height: 80,
              style: 'img',
            },
            {
              style: 'header',
              text: '"Año de la Unidad, la Paz y el Desarrollo"',
              fontSize: 10,
              alignment: 'center'
            },
            {
              text: 'Tamburco, '+this.formatearFecha(this.fechaingreso2),
              alignment: 'right',
             // width: 'auto',

            },
            {
              text: 'CARTA N° '+this.nro_carta,
              bold: true,
              decoration: 'underline',
              margin: [0, 10, 0, 0]

            },
            { text: 'señor:', style: 'paragraph', margin: [0, 10, 0, 0] },
            'Mstro. Feliciano Escobedo Silva',
            {

              text: 'Decanatura de '+ this.escuela,
              margin: [0, 5, 0, 0],
              alignment: 'left',

              bold: true

            },
            {
              text: 'Presente.-',
              margin: [0, 10, 0, 0] ,
            },
            {
              columns: [
                {
                  text: 'ASUNTO',
                  bold: true,
                  margin: [0, 10, 0, 0] ,

                  width: 'auto',
                },
                {
                  text: ': Remito dictamen de Apto y expedito para la obtención de ' + this.tipo ,
                  alignment: 'right. justify',
                  margin: [150, 10, 0, 0],
                  noWrap: false,
                  align: 'right',
        
                }
              ]
            },
            {
              style: 'reference',
              columns: [
                {
                  width: 'auto',
                  text: 'Ref.:  ',
                  bold: true,
                  margin: [0, 10, 0, 0] ,

                  // decoration: 'underline'
                },
                { 
                text: ': DICTAMEN ' + this.nro_dictamen,
                alignment: 'right',
                noWrap: false,

                margin: [0, 10, 110, 0],


                }
                
              ]
            },
            {
              style: 'content',
              text: [
                {
                  text: 'Es grato dirigirme a usted, para saludarle cordialmente, y al mismo tiempo remito el dictamen que determina APTA y EXPEDITO para la obtencion de Grado Academico de ' + this.tipo + ' en ',
                  
                },               
                { text: this.escuela.toUpperCase(), style: 'uppercase', },
                ' en cumplimiento del reglamento General de Grados y Titulos, aprobado con numero de Resolucion N° ',
                { text: this.detallePlan_estudio.nombre },
                { text: ' de la, fecha 05 de julio del 2021', style: 'italic' },
                ' de la Universidad Nacional Micaela Bastidas de Apurimac; de la egresada ',
                { text: this. nombre.toUpperCase() + ' ' + this.apellido.toUpperCase(), style: 'uppercase' },
                '. Sin otro particular, aprovecho la ocasion para renovarle las muestras de mi especial consideracion y estima personal.'
              ]
            },
            {
              style: 'closing',
              text: 'Atentamente;'

            }
            // ... el resto de tu contenido del PDF
          ],
          styles: {
            img:{alignment: 'center'},
            header: { bold: true, margin: [0, 0, 0, 10] },
            info: { margin: [0, 0, 0, 10] },
            date: { bold: true },
            paragraph: { margin: [0, 0, 0, 5] },
            subject: { margin: [0, 10, 0, 5] },
            reference: { margin: [0, 0, 0, 10] },
            content: { margin: [0, 10, 0, 10], alignment: 'justify', lineHeight: 1.5},
            uppercase: { bold: true },
            italic: { italics: true },
            closing: { margin: [0, 10, 0, 0],alignment: 'center',}
          }
        };

        // const pdf = pdfMake.createPdf(pdfDefinition);
        // pdf.open();

        const pdf = pdfMake.createPdf(pdfDefinition);

    // Crear un Blob con el PDF generado
    pdf.getBlob((pdfBlob: Blob) => {
      this.pdfBlobAzul = pdfBlob;

      // Crear una URL segura para el Blob del PDF
      this.pdfUrlAzul = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.pdfBlobAzul));
    });


      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });


  }

  obtenerValorSeleccionado() {
    console.log('Valor seleccionado:', this.selectedPlan);
  }

  //para dar formato a la fecha
  formatearFecha(fecha:any) {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaPartes = fecha.split(/[\s/:]+/);
    const dia = fechaPartes[0];
    const mes = meses[parseInt(fechaPartes[1], 10) - 1];
    const año = fechaPartes[2];
    
    return `${dia} de ${mes} del ${año}`;
  }
  formatearFecha2(fecha:any) {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaPartes = fecha.split(/[\s/:]+/);
    const dia = fechaPartes[0];
    const mes = meses[parseInt(fechaPartes[1], 10) - 1];
    const año = fechaPartes[2];
    const hora = parseInt(fechaPartes[3], 10);
    const minutos = parseInt(fechaPartes[4], 10);
    const periodo = fechaPartes[5];

    const horaFormateada = `${hora}:${minutos < 10 ? '0' + minutos : minutos} ${periodo}`;

    return `${dia} de ${mes} del ${año} a horas ${horaFormateada}`;
  }
  formatearFecha3(fecha:any) {
    const fechaPartes = fecha.split(/[\s/:]+/);
    const dia = fechaPartes[0];
    const mes = fechaPartes[1];
    const año = fechaPartes[2];
    const hora = fechaPartes[3];
    const minutos = fechaPartes[4];
    const periodo = fechaPartes[5];

    return `${dia}/${mes}/${año} a horas ${hora}:${minutos} ${periodo}`;
  }


  
    //para guardar la carta 
  putCarta(){

    const nro_correlativo = this.nroCarta + '-'+this.anioActual+'-UGT-DFI-UNAMBA';
    const id_carta = this.id_carta;
    const token = this.getToken();
    const formData = {
      id_carta,
      nro_correlativo,
      token
    };

    this.api.putCarta(formData).subscribe(data =>{
      console.log(formData);
      window.location.reload();

      // this.router.navigate(['tramites']);
    });

  }

  getPlanEstudio(){
    this.api.getPlanEstudio().subscribe((data) =>{
      this.dataPlan_estudio = data
      // window.location.reload();
      console.log("data",this.dataPlan_estudio);

      // this.router.navigate(['tramites']);
    });

  }
  putDictamen(){
    const id_dictamen = this.id_dictamen
    const id_plan_estudio = this.selectedPlan
    const token = this.getToken();
    const formData = {
      id_dictamen,
      id_plan_estudio,
      token
    };
    this.api.putDictamen(formData).subscribe(data =>{
    // //   console.log(formData);
    window.location.reload();

    //   // this.router.navigate(['tramites']);
    });

  }

  getDataPlan(id:any){
    this.api.getDataPlanEstudio(id).subscribe(data =>{
      this.detallePlan_estudio = data[0]
      this.estudios_generales = this.detallePlan_estudio.estudios_generales
      this.estudios_esfecificos = this.detallePlan_estudio.estudios_esfecificos
      this.estudios_especialidad = this.detallePlan_estudio.estudios_especialidad
      this.practicas_preprofecionales = this.detallePlan_estudio.practicas_preprofecionales
      this.total = this.detallePlan_estudio.total
    
      console.log("los datos de este plan estudio es: ", this.estudios_generales, this.estudios_esfecificos, this.estudios_especialidad, this.practicas_preprofecionales, this.total);
      //   // this.router.navigate(['tramites']);
    });
  
  }

  getToken(){
    return localStorage.getItem('token');
  }

  regresar(){
    this.router.navigate(['tramites']);
  }

}
