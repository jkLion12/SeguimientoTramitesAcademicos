import { Component,ViewChild ,OnInit, ElementRef } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { EstudianteI } from 'src/app/modelos/estudiante.interface';
import { WhatsAppServiceService } from 'src/app/servicios/whatsappservice/whats-app-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  datos!: EstudianteI[];
  filteredDatos: EstudianteI[] = [];
  searchTerm: string = '';
  pageSize: number = 12;
  pagedDatos: EstudianteI[] = [];

  //datos para mandar mensaje
  @ViewChild('miInput') miInput: ElementRef;

  numero: any;
  nombre: any;
  mensaje: any;
  respuesta:any={};


  constructor(private api: ApiLocalService, private whatsappSvc: WhatsAppServiceService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.api.getAllContacts(1).subscribe((data: EstudianteI[]) => {
      this.datos = data;
      this.filteredDatos = data;
      this.setPage(1);

    });
  }

  searchContacts() {
    if (!this.searchTerm.trim()) {
      this.filteredDatos = this.datos;
    } else {
      this.filteredDatos = this.datos.filter((dato: EstudianteI) => {
        return (
          dato.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          dato.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          dato.direccion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          dato.dni.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          dato.nrocelular.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          dato.sexo.toLowerCase().includes(this.searchTerm.toLowerCase())
          // Añade aquí todos los campos que quieras incluir en la búsqueda
        );
      });
      this.setPage(1);

    }
  }

  // pageChanged(event: any) {
  //   this.setPage(event.pageIndex + 1);
  // }

  pageChanged(event: any) {
    this.setPage(event.pageIndex + 1);
  }
  

  // setPage(pageNumber: number) {
  //   const startIndex = (pageNumber - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.pagedDatos = this.filteredDatos.slice(startIndex, endIndex);
  // }

  setPage(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDatos = this.filteredDatos.slice(startIndex, endIndex);
  }

  getDatosEstudiante(nombre: any, numero: any){
    this.nombre = nombre;
    this.numero = "51"+numero;
    console.log("nombre: "+this.nombre, "numero: "+this.numero)
  }

  //FUNCION PARA MANDAR MENSAJE
  enviarWhatsapp(){
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

  obtenerContenido(){
    const contenido = this.miInput.nativeElement.value;
    this.mensaje = contenido
    console.log("EL MENSAJE ES : "+ this.mensaje);
    this.miInput.nativeElement.value = ''; // Limpiar el contenido del input

    this.enviarWhatsapp();

  }


}
