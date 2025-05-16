import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiLocalService } from 'src/app/servicios/apiLocal/api-local.service';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.scss']
})
export class DetalleEstudianteComponent {
  currentPage: string = '';

  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api:ApiLocalService, private activaterouter:ActivatedRoute){
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

}
