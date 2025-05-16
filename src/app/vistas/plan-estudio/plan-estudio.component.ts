import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { PlanEstudioI } from "../../modelos/plan_estudio.interface";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-estudio',
  templateUrl: './plan-estudio.component.html',
  styleUrls: ['./plan-estudio.component.scss']
})
export class PlanEstudioComponent {
  estudiantes: PlanEstudioI[] = [];
  //dataSource!: MatTableDataSource<EstudianteI>; // Asegúrate de importar 'EstudianteI' si no lo has hecho ya
  dataSource = new MatTableDataSource<PlanEstudioI>(); // Asegúrate de importar 'EstudianteI'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    //para crear nuevo plan estudio
    token_aux: any = ''
    disimiss: any = ''
    datosPlan!: PlanEstudioI;
    nuevoForm = new FormGroup({
      // id_escuela: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]),
      id_escuela: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      // fecha: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      fecha: new FormControl('', [Validators.required]),
      estudios_generales: new FormControl('', [Validators.required]),
      estudios_esfecificos: new FormControl('', [Validators.required]),
      estudios_especialidad: new FormControl('', [Validators.required]),
      practicas_preprofecionales: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      token: new FormControl(''),
    });
  
  //PARA EDITAR EL paln estudio
  editarForm = new FormGroup({
    id_plan_estudio: new FormControl(''),
    id_escuela: new FormControl(''),
    nombre:new FormControl(''),
    // fecha: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    fecha:new FormControl(''),
    estudios_generales: new FormControl(''),
    estudios_esfecificos: new FormControl(''),
    estudios_especialidad: new FormControl(''),
    practicas_preprofecionales: new FormControl(''),
    total:new FormControl(''),
    token: new FormControl(''),

   });


  constructor(private api:ApiLocalService, private router:Router){}
  displayedColumns: string[] = ['id_plan_estudio', 'nombre', 'fecha', 'estudios_generales', 'estudios_esfecificos', 'estudios_especialidad', 'practicas_preprofecionales', 'total'];


  ngOnInit(): void {
    this.getPlanes();
    //this.dataSource.paginator = this.paginator; // Donde 'paginator' es la referencia al paginador en tu HTML
    let token = localStorage.getItem('token');
    this.token_aux = token
    this.nuevoForm.patchValue({
      'token': token
    })
    //this.dataSource = new MatTableDataSource(this.estudiantes);


  }

  limpiarFormulario() {

    const tokenInicial = this.nuevoForm.get('token');
    this.nuevoForm.reset();
    this.nuevoForm.patchValue({
      'token': this.token_aux
    })
  }

    //validaciones
    get nombre() {
      return this.nuevoForm.get('nombre');
      
    }
  

    postForm(form: any){

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
  
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro que quieres registrar un nuevo Plan de estudio?',
        text: "podras eliminarlo si lo requiere",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Agregar!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.postPlanEstudio(form).subscribe( data =>{
            //console.log(data);
            
            
            Swal.fire({
              toast: true,
              title: 'Plan de estudio registrado con exito',
              icon: 'success',
              iconColor: '#ffffff',
              customClass: 'bg-success',
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            this.limpiarFormulario() 
            this.getPlanes()
            
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            toast: true,
            title: '<span style="color: white;">No se agrego ni Plan Estudio</span>',
            color: '#ffffff',
            icon: 'warning',
            iconColor: '#ffffff',
            customClass: 'bg-warning',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });    
        }
      })
  
  
    }

    putForm(form: any) {
      // Crear una copia del formulario sin el campo de contraseña si está vacío
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
  
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro que quieres ediatar este plan de estudio?',
        text: "Podrás editarlo con normalidad mas tarde",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          
          const formData = { ...form };
  
          this.api.putPlanEstudio(formData).subscribe(data => {
            this.disimiss= 'disminuir',
            Swal.fire({
              toast: true,
              title: 'Plan de estudio editado',
              icon: 'success',
              iconColor: '#ffffff',
              customClass: 'bg-success',
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
              this.getPlanes();
          });
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            toast: true,
            title: '<span style="color: white;">Se cancelo la edicion</span>',
            color: '#ffffff',
            icon: 'warning',
            iconColor: '#ffffff',
            customClass: 'bg-warning',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });    
        }
      })
  
      
    }



  getPlanes() {
    this.api.getAllPlanEstudio(1).subscribe(data => {
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
      case 'id_plan_estudio':
        return 'ID';
      case 'nombre':
        return 'Nombre';
      case 'fecha':
        return 'Fecha';
      case 'estudios_generales':
        return 'Estudios Generales';
      case 'estudios_esfecificos':
        return 'Estudios Específicos';
      case 'estudios_especialidad':
        return 'Estudios de Especialidad';
      case 'practicas_preprofecionales':
        return 'Practicas Pre-Profesionales';
      case 'total':
        return 'Total de créditos';
      // Agrega más columnas aquí si es necesario
      default:
        return column;
    }
  }
  
 
  editarPlan(id: any){
    console.log("el id del plan es:", id)
  }

  getPlan(id: any){

    console.log(id)
    let token = this.getToken();
    this.api.getSinglePlanEstudio(id).subscribe(data =>{
      if (Array.isArray(data) && data.length > 0) {//como mi servicio me da un array con un objeto, realizo esta acion para acceder al mismo objeto
        this.datosPlan = data[0];
        
        console.log(this.datosPlan)

        this.editarForm.setValue({
          'id_plan_estudio': id,
          'id_escuela': this.datosPlan.id_escuela,
          'nombre': this.datosPlan.nombre,
          'fecha': this.datosPlan.fecha,
          'estudios_generales': this.datosPlan.estudios_generales,
          'estudios_esfecificos': this.datosPlan.estudios_esfecificos,
          'estudios_especialidad': this.datosPlan.estudios_especialidad,
          'practicas_preprofecionales': this.datosPlan.practicas_preprofecionales,
          'total': this.datosPlan.total,
          'token': token     
        });

      } 
      //console.log(data);
    });    

  }

  eliminarPlan(id: any){
    console.log("el id del plan es:", id)

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres eliminar este Plan de estudio?',
      text: "No podras recuperar este registro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deletePlanEstudio(id).subscribe( data =>{
          //console.log(data);
          
          
          Swal.fire({
            toast: true,
            title: 'Plan de estudio eliminado',
            icon: 'success',
            iconColor: '#ffffff',
            customClass: 'bg-success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          this.getPlanes()
          
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          title: '<span style="color: white;">No se elimino el Plan Estudio</span>',
          color: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
          customClass: 'bg-warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });    
      }
    })



  }



  getToken(){
    return localStorage.getItem('token');
  }


}
