import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { Router } from "@angular/router";
import { EstudianteI } from 'src/app/modelos/estudiante.interface';
import { HitoI } from 'src/app/modelos/hito.interface';
import { Detalle_TramiteI } from 'src/app/modelos/detalle_tramite.interface';

//
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-progreso-tramite',
  templateUrl: './progreso-tramite.component.html',
  styleUrls: ['./progreso-tramite.component.scss']
})
export class ProgresoTramiteComponent  implements OnInit{


  //para la tabla
  dataSource = new MatTableDataSource<EstudianteI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // displayedColumns: string[] = ['id_tramite', 'nombre', 'apellido' , 'sexo', 'estado'];
  displayedColumns: string[] = ['id_tramite', 'nombre', 'sexo', 'nro_hito', 'estado'];



  //
  estudiantes: EstudianteI[] = [];
  id_estudiante: any
  constructor(private api:ApiLocalService, private router:Router){}

  ngOnInit(): void {
    this.getEstudiantes();
    //this.dataSource.paginator = this.paginator; // Donde 'paginator' es la referencia al paginador en tu HTML
    this.getEstudentProgress()
    //this.dataSource = new MatTableDataSource(this.estudiantes);

  }

  getEstudiantes() {
    this.api.getAllEstudiantes(1).subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.id_estudiante = data[0].id_estudiante;
        // console.log(this.estudiantes)  
      }
    });
  }

  getEstudentProgress(){
    this.api.getEstudiantesProgress(this.id_estudiante).subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.estudiantes = data;
        this.dataSource.data = data; // Asigna los datos al dataSource aquí
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; // Asigna el MatSort aquí
        if (this.dataSource.paginator) {
          // Accede a la propiedad paginator solo si no es nula
          this.dataSource.paginator.pageIndex = 0;
        }
  
        console.log(this.estudiantes)  
      }
    });  
  }

  // getEstudiantes() {
  //   this.api.getAllEstudiantes(1).subscribe(data => {
  //     //this.estudiantes = data;
  //     this.dataSource.data = data; // Asigna los datos al dataSource aquí
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort; // Asigna el MatSort aquí
  //     if (this.dataSource.paginator) {
  //       // Accede a la propiedad paginator solo si no es nula
  //       this.dataSource.paginator.pageIndex = 0;
  //     }
      
  //   });
  // }

  getColumnHeader(column: string): string {
    switch (column) {
      case 'id_tramite':
        return '#';
      case 'nombre':
        return 'Nombre Completo';
      case 'sexo':
        return 'Sexo';
      case 'nro_hito':
        return 'Progreso del trámite';
      case 'estado':
        return 'Estado';

      default:
        return column;
    }
  }

  handleKeyup(event: any) {
    const filterValue = event.target.value;
    this.applyFilter(filterValue);
  }
  
  applyFilter(filterValue: any) {
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getHeaderWidth(column: string): string {
    switch (column) {
      case 'id_tramite':
        return '1%';
      case 'nombre':
        return '20%';
      case 'sexo':
        return '10%';
      case 'hito':
        return 'auto'; // O el ancho que desees
      case 'estado':
        return '8%';
      // Agrega más casos según sea necesario
      default:
        return 'auto';
    }
  }
  

}
