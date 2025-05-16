import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosI } from "../../modelos/usuarios.interface";


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss']
})
export class EditarusuarioComponent implements OnInit{

  usuario: UsuariosI[] = [];
  idusuario: any = null;

  constructor(private activaterouter:ActivatedRoute, private router:Router, private api:ApiLocalService){

  }
  datosUsuario!: UsuariosI;
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

  ngOnInit(): void {
    let usuarioid = this.activaterouter.snapshot.paramMap.get('id');
    this.idusuario = usuarioid;
    let token = this.getToken();
    this.api.getSingleUsuario(usuarioid).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosUsuario = data[0];
        
        this.editarForm.setValue({
          'ID': usuarioid,
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

  regresar(){
    this.router.navigate(['usuarios']);
  }

  getToken(){
    return localStorage.getItem('token');
  }


  // postForm(form: any){
  //   this.api.putTramite(form).subscribe(data =>{
  //     console.log(data);
  //     this.router.navigate(['usuarios']);
  //   });
  // }

  postForm(form: any) {
    // Crear una copia del formulario sin el campo de contraseña si está vacío
    const formData = { ...form };
    if (!form.nuevacontrasena) {
        delete formData.nuevacontrasena;
    }

    this.api.putUsuario(formData).subscribe(data => {
        this.router.navigate(['usuarios']);
    });
}


  
  
  
  eliminarUsuario() {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')){
      this.api.deleteUsuario(this.idusuario).subscribe(() => {
        // Eliminar el registro de la lista de personas en el frontend
        this.usuario = this.usuario.filter(user => user.ID !== this.idusuario);
        this.router.navigate(['usuarios']);
      });
    }
  }


}
