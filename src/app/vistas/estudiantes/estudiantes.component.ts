import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { EstudianteI } from "../../modelos/estudiante.interface";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

import { Router } from "@angular/router";
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit{
  estudiantes: EstudianteI[] = [];
  //dataSource!: MatTableDataSource<EstudianteI>; // Asegúrate de importar 'EstudianteI' si no lo has hecho ya
  dataSource = new MatTableDataSource<EstudianteI>(); // Asegúrate de importar 'EstudianteI'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //PARA EDITAR EL ESTUDIANTE
  datosEstudiante: any
  detalleEstudiante!: EstudianteI
//detalle de estudiante
nombre:any
apellido:any
dni:any
numero:any
escuela:any
facultad:any
sexo:any
correo:any
codigo:any
direccion:any
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    id_estudiante: new FormControl(''),
    nrocelular: new FormControl(''),
    direccion: new FormControl(''),
    token: new FormControl(''),
   });


  constructor(private api:ApiLocalService, private router:Router){}
  // displayedColumns: string[] = ['id_estudiante', 'nombre', 'apellido', 'dni', 'escuela', 'codigo', 'direccion', 'nrocelular', 'sexo', 'correo'];
  displayedColumns: string[] = ['id_estudiante', 'nombre', 'apellido', 'sexo','codigo', 'nrocelular', 'direccion'];


  ngOnInit(): void {
    this.getEstudiantes();
    //this.dataSource.paginator = this.paginator; // Donde 'paginator' es la referencia al paginador en tu HTML

    //this.dataSource = new MatTableDataSource(this.estudiantes);

  }

  getEstudiantes() {
    this.api.getAllEstudiantes(1).subscribe(data => {
      //this.estudiantes = data;
      this.dataSource.data = data; // Asigna los datos al dataSource aquí
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; // Asigna el MatSort aquí
      if (this.dataSource.paginator) {
        // Accede a la propiedad paginator solo si no es nula
        this.dataSource.paginator.pageIndex = 0;
      }
      
    });
  }
 
  
  handleKeyup(event: any) {
    const filterValue = event.target.value;
    this.applyFilter(filterValue);
  }
  
  applyFilter(filterValue: any) {
    // Convierte el valor de filtro a minúsculas
    filterValue = filterValue.toLowerCase();
    // Aplica el filtro al dataSource
    this.dataSource.filter = filterValue;
  }
  
  getColumnHeader(column: string): string {
    switch (column) {
      case 'id_estudiante':
        return 'ID';
      case 'nombre':
        return 'Nombre';
      case 'apellido':
        return 'Apellido';
      case 'dni':
        return 'DNI';
      case 'escuela':
        return 'Escuela';
      case 'codigo':
        return 'Código';
      case 'direccion':
        return 'Dirección';
      case 'nrocelular':
        return 'N° Celular';
      case 'sexo':
        return 'Género';
      case 'correo':
        return 'Correo';
      // Agrega más columnas aquí si es necesario
      default:
        return column;
    }
  }
  
 
  editarEstudiante(id: any){
    console.log("el id del estudiante es:", id)
  }

  putForm(form: any){
    const formData = { ...form };

    this.api.putEstudiante(formData).subscribe(data => {
      Swal.fire({
        toast: true,
        title: 'Estudiante editado con exito',
        icon: 'success',
        iconColor: '#ffffff',
        customClass: 'bg-success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
        this.getEstudiantes();
    });
  }




  getStudent(id: any){

    this.api.getSingleEstudiante(id).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosEstudiante = data[0];
        
        console.log(this.datosEstudiante)


        this.editarForm.setValue({
          'nombre': this.datosEstudiante.nombre,
          'id_estudiante': id,
          'direccion': this.datosEstudiante.direccion,
          'nrocelular': this.datosEstudiante.nrocelular,
          'token':  this.getToken() 
        });

      } 
      //console.log(data);
    });    

  }

  getToken(){
    return localStorage.getItem('token');
  }

  //para obtener detalles del estudiante
  getStudentDetail(id: any){

    // this.api.getDetalleEstudiante(id).subscribe((data: EstudianteI) =>{
    this.api.getDetalleEstudiante(id).subscribe((data: EstudianteI) => {

        //console.log(data)
        this.detalleEstudiante = data[0];
        this.nombre = data[0].nombre
        this.apellido = data[0].apellido
        this.numero = data[0].nrocelular
        this.dni = data[0].dni
        this.escuela = data[0].escuela
        this.facultad = data[0].facultad
        this.codigo = data[0].codigo
        this.correo = data[0].correo
        this.sexo = data[0].sexo
        this.direccion = data[0].direccion

        console.log(data[0])


      //console.log(data);
    });    

  }

}

