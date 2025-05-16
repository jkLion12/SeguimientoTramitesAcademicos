import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { SidebarComponent } from './plantillas/sidebar/sidebar.component'
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './plantillas/breadcrumbs/breadcrumbs.component';
import { NuevousuarioComponent } from './vistas/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './vistas/editarusuario/editarusuario.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { TramitesComponent } from './vistas/tramites/tramites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RevisionTramiteComponent } from './vistas/revision-tramite/revision-tramite.component';
import { DictamenComponent } from './documento/dictamen/dictamen.component';
import { CartaComponent } from './documento/carta/carta.component';
import { PdfGeneratorServiceService } from './servicios/PdfGeneratorService/pdf-generator-service.service';
import { NgChartsModule } from 'ng2-charts';
import { DocumentsComponent } from './documento/documents/documents.component';
import { Page404Component } from './plantillas/page404/page404.component';
import { ProgresoTramiteComponent } from './vistas/progreso-tramite/progreso-tramite.component';
import { ContactsComponent } from './vistas/contacts/contacts.component';
import { PlanEstudioComponent } from './vistas/plan-estudio/plan-estudio.component';

// import { EstudiantesComponent } from './vistas/estudiantes/estudiantes.component';
// import { LoginComponent } from './vistas/login/login.component';
// import { DashboardComponent } from './vistas/dashboard/dashboard.component';
// import { NuevoComponent } from './vistas/nuevo/nuevo.component';
// import { EditarComponent } from './vistas/editar/editar.component';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { DetalleEstudianteComponent } from './vistas/detalle-estudiante/detalle-estudiante.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NuevousuarioComponent,
    EditarusuarioComponent,
    UsuariosComponent,
    TramitesComponent,
    RevisionTramiteComponent,
    DictamenComponent,
    CartaComponent,
    DocumentsComponent,
    Page404Component,
    ProgresoTramiteComponent,
    ContactsComponent,
    PlanEstudioComponent,
    InicioComponent,
    DetalleEstudianteComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NgChartsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
    
  ],
  providers: [PdfGeneratorServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
