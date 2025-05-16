import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { Router } from "@angular/router";
import { UsuariosI } from "../../modelos/usuarios.interface";
///para la tabla
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ResponseI } from "../../modelos/response.interface";
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {


  disimiss: any = ''

  usuarios: UsuariosI[] = [];
  displayedColumns: string[] = ['ID', 'codusuario', 'usuario' ,'nombreusuario', 'estado', 'nivel', 'rol', 'fechacreacion'];

  //para la tabla
  dataSource = new MatTableDataSource<UsuariosI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //
  //para crear nuevo usuario
  token_aux: any = ''

  nuevoForm = new FormGroup({
    codusuario: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]),
    usuario: new FormControl('', [Validators.required]),
    nombreusuario: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    contrasena: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    nivel: new FormControl(''),
    rol: new FormControl('', [Validators.required]),
    fechacreacion: new FormControl('', [Validators.required]),
    token: new FormControl(''),
  });


  //para ediatr
  datosUsuario!: UsuariosI;
  usuario: UsuariosI[] = [];
  idusuario: any = null;

  // editarForm = new FormGroup({
  //   ID: new FormControl(''),
  //   codusuario: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]),
  //   usuario: new FormControl('', [Validators.required]),
  //   nombreusuario: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
  //   contrasena: new FormControl('', [Validators.required]),
  //   nuevacontrasena: new FormControl('', [Validators.required]),
  //   estado: new FormControl('', [Validators.required]),
  //   nivel: new FormControl(''),
  //   rol: new FormControl('', [Validators.required]),
  //   fechacreacion: new FormControl('', [Validators.required]),
  //   token: new FormControl(''),
  // });
  editarForm = new FormGroup({
    ID: new FormControl(''),
    codusuario: new FormControl(''),
    usuario: new FormControl(''),
    nombreusuario: new FormControl(''),
    nuevacontrasena: new FormControl(''),
    
    estado: new FormControl(''),
    nivel: new FormControl(''),
    rol: new FormControl(''),
    fechacreacion: new FormControl(''),
    token: new FormControl('')
  });


  constructor(private api:ApiLocalService, private router:Router){}

  ngOnInit(): void {
    this.getUsuarios();
    ///modal
    let token = localStorage.getItem('token');
    this.token_aux = token
    this.nuevoForm.patchValue({
      'token': token
    })
  }


  //para la tabla

  getUsuarios(){
    this.api.getAllUsuarios(1).subscribe(data => {
      this.usuarios = data;
      this.dataSource.data = data; // Actualiza los datos del dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getColumnHeader(column: string): string {
    switch (column) {
      case 'ID':
        return 'ID';
      case 'codusuario':
        return 'Cod. Usuario';
      case 'usuario':
        return 'Usuario';
      case 'nombreusuario':
        return 'Nombre de Usuario';
      case 'estado':
        return 'Estado';
      case 'nivel':
        return 'Nivel';
      case 'rol':
        return 'Rol';
      case 'fechacreacion':
        return 'Fecha de creacion';
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

  ///////////////////////////


  // editarUsuario(id: any){
  //   this.router.navigate(['editarusuario',id]);
  // }

  getUser(id: any){

    console.log(id)
    let token = this.getToken();
    this.api.getSingleUsuario(id).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosUsuario = data[0];
        
        console.log(this.datosUsuario)


        this.editarForm.setValue({
          'ID': id,
          'codusuario': this.datosUsuario.codusuario,
          'usuario': this.datosUsuario.usuario,
          'nombreusuario': this.datosUsuario.nombreusuario,
          'nuevacontrasena': '',
          'estado': this.datosUsuario.estado,
          'nivel': this.datosUsuario.nivel,
          'rol': this.datosUsuario.rol,
          'fechacreacion': this.datosUsuario.fechacreacion,
          'token': token     
        });

      } 
      //console.log(data);
    });    

  }

  

  putForm(form: any) {
    // Crear una copia del formulario sin el campo de contraseña si está vacío
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
        
        const formData = { ...form };
        if (!form.nuevacontrasena) {
            delete formData.nuevacontrasena;
        }

        this.api.putUsuario(formData).subscribe(data => {
          this.disimiss= 'disminuir',
          Swal.fire({
            toast: true,
            title: 'Usuario editado',
            icon: 'success',
            iconColor: '#ffffff',
            customClass: 'bg-success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
            this.getUsuarios();
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Se cancelo la edicion la edicion</span>',
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

  //


  nuevoUsuario(){
    this.router.navigate(['nuevousuario']);
  }

  // eliminarUsuario(id: string) {
  //   if (confirm('¿Estás seguro de que deseas eliminar a este usuario?')){
  //     this.api.deleteUsuario(id).subscribe(() => {
  //       // Eliminar el registro de la lista de personas en el frontend
  //       this.usuarios = this.usuarios.filter(user => user.ID !== id);
  //       this.getUsuarios()
  //     });
  //   }
  // }

  //alerta para eliminar
  
  eliminarUsuario(id: string) {
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres eliminar a este usuario?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          title: 'Usuario Eliminado',
          icon: 'success',
          iconColor: '#ffffff',
          customClass: 'bg-success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });      
        this.api.deleteUsuario(id).subscribe(() => {
          // Eliminar el registro de la lista de personas en el frontend
          this.usuarios = this.usuarios.filter(user => user.ID !== id);
          this.getUsuarios()
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">Se canceló la eliminación</span>',
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

  // mostrarAlerta() {
  //   Swal.fire({
  //     title: 'Título de la alerta',
  //     text: 'Este es el mensaje de la alerta',
  //     icon: 'info', // Puedes usar 'success', 'error', 'warning', 'info', etc.
  //     confirmButtonText: 'Aceptar',
  //   });


  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Your work has been saved",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
    

  // }

  //para guardar un nuevo 
   //formulario modal
   postForm(form: any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres crear nuevo usuario?',
      text: "podras eliminarlo si lo requiere",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Agregar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postUsuario(form).subscribe( data =>{
          //console.log(data);
          
          
          Swal.fire({
            toast: true,
            title: 'Usuario registrado con exito',
            icon: 'success',
            iconColor: '#ffffff',
            customClass: 'bg-success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          this.limpiarFormulario() 
          this.getUsuarios()
          
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">No se agrego ni un usuario</span>',
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

  limpiarFormulario() {

    const tokenInicial = this.nuevoForm.get('token');
    this.nuevoForm.reset();
    this.nuevoForm.patchValue({
      'token': this.token_aux
    })
  }

  //validaciones
  get codusuario() {
    return this.nuevoForm.get('codusuario');
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
