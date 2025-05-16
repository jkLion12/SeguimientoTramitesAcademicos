import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  
  currentPage: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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