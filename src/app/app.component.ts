import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SeguiTramites';

  constructor(private router: Router) {
    // Suscríbete a los cambios de la URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!localStorage.getItem('token') && event.url !== '/login') {
          // Si el token no está presente y no estamos en la página de inicio de sesión,
          // redirigir al usuario al inicio de sesión
          this.router.navigate(['/login']);
        }
      }
    });
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any): void {
    // Verificar si la ubicación actual es la página de inicio de sesión
    if (this.router.url === '/login') {
      // Si estamos en la página de inicio de sesión, redirigir nuevamente al login
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    // Comprobar si el token está presente al cargar la aplicación
    if (!localStorage.getItem('token')) {
      // Si el token no está presente, redirige al usuario al inicio de sesión
      this.router.navigate(['/login']);
    }
  }
}
