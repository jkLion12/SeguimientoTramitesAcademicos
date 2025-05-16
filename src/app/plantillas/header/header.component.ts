import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { SharedDataService } from "../../servicios/shared-data/shared-data.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosI } from "../../modelos/usuarios.interface";
import * as $ from 'jquery'; // Importa jQuery
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  //mandamos el nombre del usuario 
  //@Output() nombreUsuario = new EventEmitter<string>();

  //public mostrarModal = false;

  usuario: UsuariosI[] = [];
  idusuario: any = null;

  constructor(private activaterouter:ActivatedRoute, private router:Router, private api:ApiLocalService, private shared:SharedDataService) {}

  datosUsuario!: UsuariosI;
  editarForm = new FormGroup({
    ID: new FormControl(''),
    codusuario: new FormControl(''),
    usuario: new FormControl(''),
    nuevacontrasena: new FormControl(''),
    
    estado: new FormControl(''),
    rol: new FormControl(''),
    fechacreacion: new FormControl(''),
    token: new FormControl('')
  });

  ngOnInit(): void {
    //this.getToken();
    //this.getUsuario();
    //
    let usuarioid = this.activaterouter.snapshot.paramMap.get('id');
    this.idusuario = usuarioid;
    let token = this.getToken();
    let codusuario = this.getUsuario();
    this.api.getDataUsuario(codusuario).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosUsuario = data[0];
        // mandando el nombre del usuario
        let nuevoValor = this.datosUsuario.nombreusuario;
        this.shared.setValorCompartido(nuevoValor);
        //console.log(this.nombreUsuario)
        //
        this.editarForm.setValue({
          'ID': usuarioid,
          'codusuario': this.datosUsuario.codusuario,
          'usuario': this.datosUsuario.usuario,
          'nuevacontrasena': '',
          'estado': this.datosUsuario.estado,
          'rol': this.datosUsuario.rol,
          'fechacreacion': this.datosUsuario.fechacreacion,
          'token': token     
        });
      } 
      //console.log(data);
    });   
  }

  postForm(form: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres ediatar este usuario?',
      text: "Podrás editarlo con normalidad mas tarde",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Editar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        
    // Obtén los valores actuales de los campos no editables
    const usuarioActual = this.datosUsuario.usuario; // Cambia 'usuario' por el nombre real del campo
    const nuevaContrasenaActual = this.datosUsuario.contrasena; // Cambia 'nuevacontrasena' por el nombre real del campo

    // Obtén los valores del formulario
    const formData = { ...form };

    // Si el campo 'usuario' está vacío en el formulario, usa el valor actual
    if (!formData.usuario) {
        formData.usuario = usuarioActual;
    }

    // Si el campo 'nuevacontrasena' está vacío en el formulario, usa el valor actual
    if (!formData.nuevacontrasena) {
        formData.nuevacontrasena = nuevaContrasenaActual;
    }

    // Agrega los valores de los campos no editables de this.datosUsuario
    formData['ID'] = this.datosUsuario.ID;
    formData['codusuario'] = this.datosUsuario.codusuario;
    formData['estado'] = this.datosUsuario.estado;
    formData['rol'] = this.datosUsuario.rol;
    formData['fechacreacion'] = this.datosUsuario.fechacreacion;
    formData['token'] = this.getToken();

    // Realiza la solicitud con los datos combinados
    this.api.putUsuario(formData).subscribe(data => {
      
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



  getToken(){
    let token = localStorage.getItem('token');
    //console.log(token);
    return token;
  }

  closeSession(){

    

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres cerrar sesion?',
      text: "Podrás ingresar mas tarde",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Cerrar sesion!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.deleteToken();

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Se cancelo</span>',
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


  

    // if (confirm('¿Estás seguro de que deseas cerrar sesion?')){
    // }
  }

  deleteToken(): void {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('codusuario');
    //console.log('Token eliminado');
    // También puedes redirigir al usuario a la página de inicio de sesión o a donde desees aquí.
    if (!localStorage.getItem('token')) {
      // Si el token no está presente, redirige al usuario al inicio de sesión
      this.router.navigate(['login']);
    }    
  }

  getUsuario() {
    let codusuario = localStorage.getItem('codusuario'); // Obtén el nombre de usuario desde el almacenamiento local
    return codusuario;
    //console.log(codusuario);
  }

}