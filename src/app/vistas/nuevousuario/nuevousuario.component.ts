import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { UsuariosI } from "../../modelos/usuarios.interface";
import { ResponseI } from "../../modelos/response.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.scss']
})
export class NuevousuarioComponent implements OnInit {
  nuevoForm = new FormGroup({
    //ID: new FormControl(''),
    codusuario: new FormControl(''),
    usuario: new FormControl(''),
    nombreusuario: new FormControl(''),
    contrasena: new FormControl(''),
    //confirmarContrasena: new FormControl('', Validators.required),
    estado: new FormControl('activo'),
    nivel: new FormControl(''),
    rol: new FormControl('usuario'),
    fechacreacion: new FormControl(''),
    token: new FormControl('')
  });

  constructor(private api: ApiLocalService, private router: Router) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token': token
    });
  }

  salir() {
    this.router.navigate(['usuarios']);
  }

postForm(form: any){
  //console.log(form)
  this.api.postUsuario(form).subscribe( data =>{
    //console.log(data)
    this.salir();
  });
}

  // salir(){
  //   this.router.navigate(['estudiantes']);
  // }

}



  