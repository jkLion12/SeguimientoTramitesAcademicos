import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { TramitesComponent } from './vistas/tramites/tramites.component';
import { RevisionTramiteComponent } from './vistas/revision-tramite/revision-tramite.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EstudiantesComponent } from './vistas/estudiantes/estudiantes.component';
import { NuevousuarioComponent } from './vistas/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './vistas/editarusuario/editarusuario.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { CartaComponent } from './documento/carta/carta.component';
import { DictamenComponent } from './documento/dictamen/dictamen.component';
import { DocumentsComponent } from './documento/documents/documents.component';
import { Page404Component } from './plantillas/page404/page404.component';
import { ProgresoTramiteComponent } from './vistas/progreso-tramite/progreso-tramite.component';
import { ContactsComponent } from './vistas/contacts/contacts.component';
import { PlanEstudioComponent } from './vistas/plan-estudio/plan-estudio.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { DetalleEstudianteComponent } from './vistas/detalle-estudiante/detalle-estudiante.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent, data: { title: 'Dashboard' } },
  { path:'nuevo', component:NuevoComponent, data: { title: 'Nuevo Trámite' } },
  { path:'editar/:id', component:EditarComponent },
  { path:'tramites', component:TramitesComponent, data: { title: 'Trámites' } },
  // {
  //   path: 'tramites',
  //   component: TramitesComponent,
  //   data: { title: 'Tramites' },
  //   // canActivate: [AuthGuard], // Guardia de ruta para proteger la ruta principal
  //   children: [
  //     {
  //       path: 'revision_tramite/:id',
  //       component: RevisionTramiteComponent,
  //       data: { title: 'Revision De Tramite' },
  //       canActivate: [AuthGuard] // Puedes aplicar el mismo guardia de ruta para la ruta hija si deseas protegerla también
  //     }
  //     // Otras rutas hijas de 'tramites' si las hay
  //   ]
  // },
  { path:'nuevousuario', component:NuevousuarioComponent },
  { path:'editarusuario', component:EditarusuarioComponent },
  { path:'usuarios', component:UsuariosComponent, data: { title: 'Todos Los Usuarios' }, canActivate: [AuthGuard] },
  { path:'estudiantes', component:EstudiantesComponent, data: { title: 'Alumnos Registrados' } },
  { path:'tramites/revision_tramite/:id', component:RevisionTramiteComponent, data: { title: 'Revisíon De Trámite' } },
  { path:'carta/:id', component:CartaComponent },
  { path:'dictamen', component:DictamenComponent },
  { path:'tramites/documents/:id', component:DocumentsComponent, data: { title: 'Documentos' } },
  { path: 'not-found', component: Page404Component, data: { title: 'Not-Found' } },
  { path: 'progreso_tramite', component: ProgresoTramiteComponent, data: { title: 'Progreso Del Trámites' } },
  { path: 'contacts', component: ContactsComponent, data: { title: 'Contactos' } },
  { path: 'plan_estudio', component: PlanEstudioComponent, data: { title: 'Nuevo Plan de Estudio' } },
  { path: 'inicio', component: InicioComponent, data: { title: 'Inicio' } },
  { path: 'detalle_estudiante/:id', component: DetalleEstudianteComponent, data: { title: 'Detalle Estudiante' } },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, EditarComponent,NuevoComponent, EstudiantesComponent];
