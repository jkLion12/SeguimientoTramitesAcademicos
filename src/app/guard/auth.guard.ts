import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userRole = localStorage.getItem('rol');

    if (userRole === 'Administrador') {
      return true; // Permite el acceso si el usuario es un administrador
    } else {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Usted no tiene permiso para acceder a esta opción',
        icon: 'warning'
      });
      this.router.navigate(['/']);

      return false; // Bloquea el acceso si el usuario no es un administrador
    }
  }
}
