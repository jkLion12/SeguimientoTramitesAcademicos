import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from "../../servicios/shared-data/shared-data.service";
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  //para el nombre del usuario
  valorRecibido: string = '';
  //
  rutaAnterior: string = ''; // Variable para almacenar la ruta anterior

  userRole: any; // Variable para almacenar el rol del usuario

  constructor(private router: Router,private location: Location ,private shared: SharedDataService) {} // Inyecta el servicio Router


  ngOnInit() {
    // Obtén el rol del usuario desde el localStorage al cargar el componente
    this.userRole = localStorage.getItem('rol');
    this.shared.valorCompartido$.subscribe(nuevoValor => {
      this.valorRecibido = nuevoValor;
    });  
  }

  VerificarAcceso(){
    this.rutaAnterior = this.location.path(); // Almacena la ruta actual antes de mostrar la alerta

    if (this.userRole !== 'Administrador') {
      Swal.fire({
        toast: true,
        title: 'Usted no tiene permiso para acceder a esta opcion',
        icon: 'warning',
        iconColor: '#ffffff',
        customClass: 'bg-danger',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigateByUrl(this.rutaAnterior); // Navega de regreso a la ruta almacenada

      // Redirecciona a una página o realiza otra acción según sea necesario
      // Ejemplo: this.router.navigate(['/home']);
    }else{
      
      this.router.navigateByUrl('/usuarios'); // Navega de regreso a la ruta almacenada

    }

  }





}
