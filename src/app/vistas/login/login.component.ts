import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { ApiLocalService } from '../../servicios/apiLocal/api-local.service';
import { loginI } from "../../modelos/login.interface";
import { Router } from "@angular/router";
import { ResponseI } from "../../modelos/response.interface"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  './assets2/css/owl.carousel.min.css',
  './assets2/fonts/icomoon/style.css',
  './assets2/css/style.css',
  ]
})
export class LoginComponent implements OnInit{

 loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
 })

 constructor(private api:ApiLocalService, private router:Router){}

 //para las alertas
 errorStatus: boolean = false;
 errorMsj:any = '';

 ngOnInit(): void {
   this.checkLocalStorage();
 }

 checkLocalStorage(){
  if(localStorage.getItem('token')){
    this.router.navigate(['inicio']);
  }
 }

 onLogin(form: any){
  this.api.loginByEmail(form).subscribe(data => {
    let dataResponse: ResponseI = data;
    if(dataResponse.status == "ok"){
      localStorage.setItem("token",dataResponse.result.token);
      localStorage.setItem("rol",dataResponse.result.rol);
      localStorage.setItem("codusuario",dataResponse.result.codusuario);
      this.router.navigate(['inicio']);
      Swal.fire({
        title: 'Acceso concedido',
        text: "Inicio sesión correctamente",
        icon: 'success'
      });
      console.log(data)
    }else{
      this.errorStatus = true;
      this.errorMsj = dataResponse.result.error_msg;
      Swal.fire({
        title: 'Acceso denegado',
        text: this.errorMsj,
        icon: 'warning'
      });
    
    }
  })
 }


}
