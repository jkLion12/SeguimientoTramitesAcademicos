import { Injectable } from '@angular/core';
//AQUI SE USA LA API QUE USA LA BASE DE DATOS CREADA PARA GRADOS Y TITULOS
import { loginI } from '../../modelos/login.interface'
import { TramitesI } from "../../modelos/tramites.interface";
import { TramiteI } from "../../modelos/tramite.interface";
import { Estudiante_EscuelaI } from "../../modelos/estudiante_escuela.interface";
import { UsuariosI } from "../../modelos/usuarios.interface";
import { ResponseI } from '../../modelos/response.interface'
import {  HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { AnioTrabajoI } from 'src/app/modelos/anio_trabajo.interface';
import { ObservacionI } from 'src/app/modelos/observacion.interface';
import { Detalle_TramiteI } from 'src/app/modelos/detalle_tramite.interface';
import { HitoI } from 'src/app/modelos/hito.interface';
import { CartaI } from 'src/app/modelos/carta.interface';
import { DictamenI } from 'src/app/modelos/dictamen.interface';
import { EstudianteI } from 'src/app/modelos/estudiante.interface';
import { PlanEstudioI } from 'src/app/modelos/plan_estudio.interface';
import { RequisitosI } from 'src/app/modelos/requisitos.interface';
import { DocumentoI } from 'src/app/modelos/documento.interface';
import { FechaHitoI } from 'src/app/modelos/fecha_hito.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiLocalService {
  //aqui se pone la url de la api que usa la base de datos crada para grados y titulos
  url:string = "http://localhost:80/API GRADOS TITULOS/";

  constructor(private http:HttpClient) { }

  //para la autenticacion
  loginByEmail(form:loginI):Observable<ResponseI>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion,form);
  }

  //para todo lo relacionado con tramites

  // getAllRadarTramites():Observable<TramiteI>{
  //   let direccion = this.url + "tramites?radartramites";
  //   return this.http.get<TramiteI>(direccion);
  // }

  getAllRadarTramites(anio:any):Observable<TramiteI>{
    let direccion = this.url + "tramites?radartramites=" + anio;
    return this.http.get<TramiteI>(direccion);
  }

  getAllTramites(page:number):Observable<TramiteI[]>{
    let direccion = this.url + "tramites?page=" + page;
    return this.http.get<TramiteI[]>(direccion);
  }

  getTraer_Tramite(id:any):Observable<TramiteI>{
    let direccion = this.url + "tramites?mostrar_tramite=" + id;
    return this.http.get<TramiteI>(direccion);
  }
  

  // getTramiteMes():Observable<any>{
  //   let direccion = this.url + "tramites?tramitefecha";
  //   return this.http.get<TramiteI>(direccion);
  // }

  getTramiteMes(anio: any):Observable<any>{
    let direccion = this.url + "tramites?tramitefecha=" + anio;
    return this.http.get<TramiteI>(direccion);
  }

  // getTipoTramiteMes():Observable<any>{
  //   let direccion = this.url + "tramites?tipotramite";
  //   return this.http.get<TramiteI>(direccion);
  // }

  getTipoTramiteMes(anio: any):Observable<any>{
    let direccion = this.url + "tramites?tipotramite=" + anio;
    return this.http.get<TramiteI>(direccion);
  }



  getSingleTramite(id: any):Observable<TramitesI>{
    let direccion = this.url + "tramites?id=" + id;//tramites?id=6
    return this.http.get<TramitesI>(direccion);
  }

  getCantidadTipo(anio: any):Observable<TramiteI>{
    let direccion = this.url + "tramites?cantidad_tipo=" + anio;
    return this.http.get<TramiteI>(direccion);
  }

  getAllPorcentajeTramites(anio:any):Observable<TramiteI[]>{
    let direccion = this.url + "tramites?porcentajetramite=" + anio;
    return this.http.get<TramiteI[]>(direccion);
  }

  putTramite(form: TramitesI):Observable<ResponseI>{
    let direccion = this.url + "tramites"; 
    return this.http.put<ResponseI  >(direccion, form);
  }

  deleteTramite(personId: string): Observable<ResponseI> {
    const url = this.url + "tramites?id=" + personId;
    return this.http.delete<ResponseI>(url);
  }

  postTramite(form:any):Observable<ResponseI>{
    let direccion = this.url + "tramites";
    return this.http.post<ResponseI>(direccion, form);
  }

  getTramite():Observable<TramitesI>{
    let direccion = this.url + "tramites?tramite";
    return this.http.get<TramitesI>(direccion);
  }

  getAllEstudiantes(page:number):Observable<EstudianteI[]>{
    let direccion = this.url + "estudiante?page=" + page;
    return this.http.get<EstudianteI[]>(direccion);
  }

  //para todo lo relacionado con los usuarios
  getAllUsuarios(page:number):Observable<UsuariosI[]>{
    let direccion = this.url + "usuario?page=" + page;
    return this.http.get<UsuariosI[]>(direccion);
  }

  getSingleUsuario(id: any):Observable<UsuariosI>{
    let direccion = this.url + "usuario?id=" + id;//tramites?id=6
    return this.http.get<UsuariosI>(direccion);
  }
  getDataUsuario(codusuario: any):Observable<UsuariosI>{
    let direccion = this.url + "usuario?codusuario=" + codusuario;//tramites?id=6
    return this.http.get<UsuariosI>(direccion);
  }

  putUsuario(form: UsuariosI):Observable<ResponseI>{
    let direccion = this.url + "usuario"; 
    return this.http.put<ResponseI  >(direccion, form);
  }

  deleteUsuario(usuarioid: string): Observable<ResponseI> {
    const url = this.url + "usuario?id=" + usuarioid;
    return this.http.delete<ResponseI>(url);
  }

  postUsuario(form:any):Observable<ResponseI>{
    let direccion = this.url + "usuario";
    return this.http.post<ResponseI>(direccion, form);
  }

  //para agregar estudiante
  getIdEstudiante(dni:any):Observable<EstudianteI>{
    let direccion = this.url + "estudiante?dni=" + dni;
    return this.http.get<EstudianteI>(direccion);
  }
  getSingleEstudiante(id:any):Observable<EstudianteI>{
    let direccion = this.url + "estudiante?id=" + id;
    return this.http.get<EstudianteI>(direccion);
  }
  getDetalleEstudiante(id:any):Observable<EstudianteI>{
    let direccion = this.url + "estudiante?id_student=" + id;
    return this.http.get<EstudianteI>(direccion);
  }
  getAllEstudiante():Observable<EstudianteI>{
    let direccion = this.url + "estudiante";
    return this.http.get<EstudianteI>(direccion);
  }
  getAllContacts(pagina: any):Observable<EstudianteI[]>{
    let direccion = this.url + "estudiante?pagina=" + pagina;
    return this.http.get<EstudianteI[]>(direccion);
  }


  getEstudiantesProgress(id:any):Observable<EstudianteI>{
    let direccion = this.url + "estudiante?id_estudiante=" + id;
    return this.http.get<EstudianteI>(direccion);
  }
  postEstudiante(form:any):Observable<ResponseI>{
    let direccion = this.url + "estudiante";
    return this.http.post<ResponseI>(direccion, form);
  }
  putEstudiante(form:any):Observable<ResponseI>{
    let direccion = this.url + "estudiante";
    return this.http.put<ResponseI>(direccion, form);
  }

  //para un nuevo año de trabajo
  getNumeroAnio():Observable<AnioTrabajoI>{
    let direccion = this.url + "año_trabajo?num";
    return this.http.get<AnioTrabajoI>(direccion);
  }
  getIdAnio_Trabajo():Observable<AnioTrabajoI>{
    let direccion = this.url + "año_trabajo?id";
    return this.http.get<AnioTrabajoI>(direccion);
  }

  postAnioTrabajo(form:any):Observable<ResponseI>{
    let direccion = this.url + "año_trabajo";
    return this.http.post<ResponseI>(direccion, form);
  }

  //para carta
  getNroCorrelativo_Carta():Observable<CartaI>{
    let direccion = this.url + "carta?nro";
    return this.http.get<CartaI>(direccion);
  }
  getNroCarta(id:any):Observable<CartaI>{
    let direccion = this.url + "tramites?nrocarta=" + id;
    return this.http.get<CartaI>(direccion);
  }
  postCarta(form:any):Observable<ResponseI>{
    let direccion = this.url + "carta";
    return this.http.post<ResponseI>(direccion, form);
  }
  putCarta(form:any):Observable<ResponseI>{
    let direccion = this.url + "carta";
    return this.http.put<ResponseI>(direccion, form);
  }

  //para dictamen
  getNroCorrelativo_Dictamen():Observable<DictamenI>{
    let direccion = this.url + "dictamen?nro";
    return this.http.get<DictamenI>(direccion);
  }

  // getAllPorcentajeTramites():Observable<TramiteI[]>{
  //   let direccion = this.url + "tramites?porcentajetramite";
  //   return this.http.get<TramiteI[]>(direccion);
  // }
  
  // postDictamen(form:any):Observable<ResponseI>{
  //   let direccion = this.url + "dictamen";
  //   return this.http.post<ResponseI>(direccion, form);
  // }

  postPlanEstudio(form:any):Observable<ResponseI>{
    let direccion = this.url + "plan_estudio";
    return this.http.post<ResponseI>(direccion,form);
  }
  putPlanEstudio(form:any):Observable<ResponseI>{
    let direccion = this.url + "plan_estudio";
    return this.http.put<ResponseI>(direccion,form);
  }

  getRequisitos():Observable<RequisitosI>{
    let direccion = this.url + "plan_estudio?requisitos";
    return this.http.get<RequisitosI>(direccion);
  }

  deletePlanEstudio(id:any):Observable<ResponseI>{
    let url = this.url + "plan_estudio?id="+id;
    return this.http.delete<ResponseI>(url);
  }
  getPlanEstudio():Observable<PlanEstudioI>{
    let direccion = this.url + "plan_estudio?plan";
    return this.http.get<PlanEstudioI>(direccion);
  }
  getSinglePlanEstudio(id:any):Observable<PlanEstudioI>{
    let direccion = this.url + "plan_estudio?id="+id;
    return this.http.get<PlanEstudioI>(direccion);
  }
  
  getAllPlanEstudio(page:any):Observable<PlanEstudioI[]>{
    let direccion = this.url + "plan_estudio?page="+page;
    return this.http.get<PlanEstudioI[]>(direccion);
  }

  getDataPlanEstudio(id:any):Observable<PlanEstudioI>{
    let direccion = this.url + "plan_estudio?id="+id;
    return this.http.get<PlanEstudioI>(direccion);
  }


  getNroDictamen(id:any):Observable<DictamenI>{
    let direccion = this.url + "tramites?nrodictamen=" + id;
    return this.http.get<DictamenI>(direccion);
  }

  postDictamen(form:any):Observable<ResponseI>{
    let direccion = this.url + "dictamen";
    return this.http.post<ResponseI>(direccion, form);
  }

  putDictamen(form:any):Observable<ResponseI>{
    let direccion = this.url + "dictamen";
    return this.http.put<ResponseI>(direccion, form);
  }

  //para la escuela_estudiante
  getidEscuela(nombre_escuela:any):Observable<Estudiante_EscuelaI>{
    let direccion = this.url + "escuela?nombre=" + nombre_escuela;
    return this.http.get<Estudiante_EscuelaI>(direccion);
  }
  getDetalle_Estudiante_Escuela(id_estudiante:any):Observable<Estudiante_EscuelaI>{
    let direccion = this.url + "estudiante_escuela?id_estudiante_escuela=" + id_estudiante;
    return this.http.get<Estudiante_EscuelaI>(direccion);
  }

  postEstudiante_Escuela(form:any):Observable<ResponseI>{
    let direccion = this.url + "estudiante_escuela";
    return this.http.post<ResponseI>(direccion, form);
  }

  //para el hito
  postHito(form:any):Observable<ResponseI>{
    let direccion = this.url + "hito";
    return this.http.post<ResponseI>(direccion, form);
  }
  
  getHito():Observable<HitoI>{
    let direccion = this.url + "hito?id";
    return this.http.get<HitoI>(direccion);
  }

  putHito(form: HitoI):Observable<ResponseI>{
    let direccion = this.url + "hito"; 
    return this.http.put<ResponseI  >(direccion, form);
  }


  //Para la observacion
  postObservacion(form:any):Observable<ResponseI>{
    let direccion = this.url + "observacion";
    return this.http.post<ResponseI>(direccion, form);
  }
  
  putObservacion(form: any){
    let direccion = this.url + "observacion";
    return this.http.put<ResponseI>(direccion, form);
  }

  getObservacion():Observable<ObservacionI>{
    let direccion = this.url + "observacion?id";
    return this.http.get<ObservacionI>(direccion);
  }
  getObservacion_Hito(id_tramite:any):Observable<ObservacionI>{
    let direccion = this.url + "observacion?id_tramite=" + id_tramite;
    return this.http.get<ObservacionI>(direccion);
  }
  getVerObservacion(id_observacion:any):Observable<ObservacionI>{
    let direccion = this.url + "observacion?id_observacion=" + id_observacion;
    return this.http.get<ObservacionI>(direccion);
  }

  //para el detalle_tramite
  postDetalle_Tramite(form:any):Observable<ResponseI>{
    let direccion = this.url + "detalle_tramite";
    return this.http.post<ResponseI>(direccion, form);
  }

  getDetalle_Tramite():Observable<Detalle_TramiteI>{//falta actualizar
    let direccion = this.url + "detalle_tramite?id";
    return this.http.get<Detalle_TramiteI>(direccion);
  }

  putDetalle_Tramite(form: any){
    let direccion = this.url + "detalle_tramite";
    return this.http.put<ResponseI>(direccion, form);
  }

  //Para agregar los documentos
  postDocumento(form:any):Observable<ResponseI>{
    let direccion = this.url + "documentos";
    return this.http.post<ResponseI>(direccion, form);
  }

  getDocumentos(id:any):Observable<DocumentoI>{
    let direccion = this.url + "documentos?id="+id;
    return this.http.get<DocumentoI>(direccion);
  }
  deleteDocumentos(id:any):Observable<ResponseI>{
    let direccion = this.url + "documentos?id="+id;
    return this.http.delete<ResponseI>(direccion);
  }
  // getAllDocumentos(id:any):Observable<DocumentoI>{
  //   let direccion = this.url + "detalle_tramite?id="+id;
  //   return this.http.get<DocumentoI>(direccion);
  // }

  putDocumento(form: any):Observable<ResponseI>{
    let direccion = this.url + "documentos";
    return this.http.put<ResponseI>(direccion, form);
  }

  //para la fecha de los hitos

  getFechaHito(id:any):Observable<FechaHitoI>{
    let direccion = this.url + "fecha_hito?id="+id;
    return this.http.get<FechaHitoI>(direccion);
  }

  postFechaHito(form:any):Observable<ResponseI>{
    let direccion = this.url + "fecha_hito";
    return this.http.post<ResponseI>(direccion, form);
  }

  putFechaHito(form: any): Observable<ResponseI>{
    let direccion = this.url + "fecha_hito";
    return this.http.put<ResponseI>(direccion, form);
  }


}
