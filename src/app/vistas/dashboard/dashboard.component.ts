import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ApiLocalService } from "../../servicios/apiLocal/api-local.service";
import { TramiteI } from "../../modelos/tramite.interface";
import { EstudianteI } from 'src/app/modelos/estudiante.interface';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  selected: Date | null;

  //porcentajes
  porcentajecompletado: any;
  porcentajedetenido: any;
  porcentajeproceso: any;
  dataPorcentaje: any[]
  
  //radar
  dataRadar: any;

  school:any
  type1: any
  type2: any

  //Cantidad
  cantidacompletado: any;
  cantidadetenido: any;
  cantidaproceso: any;

  //variables
  yampi=new Date()
  data:any;
  anioSeleccionado: number;

  cantidad_user: any;
  cantidad_tramites: any;
  cantidad_estudiantes: any;
  cantidad_titulo: any;
  cantidad_bachiller: any;

  //almaceno la cantidad de tramites por mes
  tramites_enero_masculino: any
  tramites_enero_femenino: any
  tramites_febrero_masculino: any
  tramites_febrero_femenino: any
  tramites_marzo_masculino: any
  tramites_marzo_femenino: any
  tramites_abril_masculino: any
  tramites_abril_femenino: any
  tramites_mayo_maculino: any
  tramites_mayo_femenino: any
  tramites_junio_masculino: any
  tramites_junio_femenino: any
  tramites_julio_masculino: any
  tramites_julio_femenino: any
  tramites_agosto_masculino: any
  tramites_agosto_femenino: any
  tramites_septiembre_masculino: any
  tramites_septiembre_femenino: any
  tramites_octubre_masculino: any
  tramites_octubre_femenino: any
  tramites_noviembre_masculino: any
  tramites_noviembre_femenino: any
  tramites_diciembre_masculino: any
  tramites_diciembre_femenino: any

  //
  constructor(private elementRef: ElementRef, private api:ApiLocalService) {}
  ngOnInit(): void {
    let fechaActual = new Date();
    this.anioSeleccionado = fechaActual.getFullYear();
    this.getUsuarios()
    this.getTramites()
    this.getEstudiantes()
    this.getTramitesMes()
    this.getTipoTramite()
    this.getPorcentaje()
    this.getRadar()
    this.getCantidadTipo()
    // this.createScatterChart();
    console.log(this.yampi) 
  }

  ngAfterViewInit() {
    // this.createRadarChart()
    // this.createScatterChart()
  }

  //traida de datos
  getUsuarios(){
    this.api.getAllUsuarios(1).subscribe(data => {
      this.cantidad_user = data.length; // Almacenar la cantidad de usuarios obtenidos

    });
  }

  getTramites(){
    this.api.getAllTramites(1).subscribe(data => {
       // Almacenar la cantidad de usuarios obtenidos
      // Filtrar por tipo 'Titulo'
      // const estudiantesTitulo = data.filter(estudiante => estudiante.tipo === 'Bachiller');
      // this.cantidad_bachiller = estudiantesTitulo.length;


      // Filtrar por tipo 'Bachiller'
      // const estudiantesBachiller = data.filter(estudiante => estudiante.tipo === 'Titulo');
      // this.cantidad_titulo = estudiantesBachiller.length;
      // this.createChart();
// console.log(this.cantidad_bachiller, this.cantidad_titulo)
    });
  }

  filtrarPorAnio(year: number) {
    this.anioSeleccionado = year;
   
    this.getUsuarios()
    this.getTramites()
    this.getEstudiantes()
    this.getTramitesMes()
    this.getTipoTramite()
    this.getPorcentaje()
    this.getRadar()
    this.getCantidadTipo()
  }

  getTramitesMes() {
    let fechaActual = new Date();
    let year = fechaActual.getFullYear();

    this.api.getTramiteMes(this.anioSeleccionado).subscribe(data => {
      console.log("data: ", data);
  
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
      meses.forEach((mes, index) => {
        const datosMes = data.filter(item => item.mes === mes);
        this[`tramites_${mes}_masculino`] = datosMes.find(item => item.sexo === '1')?.cantidad_tramites || 0;
        this[`tramites_${mes}_femenino`] = datosMes.find(item => item.sexo === '2')?.cantidad_tramites || 0;
      });
  
      this.createSecondBarChart();
    });
  }
  

  getEstudiantes(){
    this.api.getAllContacts(1).subscribe((data: EstudianteI[]) => {
      this.cantidad_estudiantes = data.length;

    });

  }

  getTipoTramite(){

    let fechaActual = new Date();
    let year = fechaActual.getFullYear();

    this.api.getTipoTramiteMes(2024).subscribe((data) => {//cantidad de tramites en general
      this.data = data;
      this.createLineChart();

      console.log("data de tramite por mes",this.data)

    });
  }
  //graficos

  createChart() {
    console.log('Cantidad de Bachiller:', this.cantidad_bachiller);
    console.log('Cantidad de Título:', this.cantidad_titulo);
    
    const canvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#barCanvas');
    if (!canvas) {
      console.error('No se encontró el elemento canvas.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas.');
      return;
    }
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bachiller','Título'],
        datasets: [
          {
            label: 'Bachiller',
            data: [this.cantidad_bachiller,0], // Valores de ejemplo
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Título',
            data: [0, this.cantidad_titulo], // Usando this.cantidad_titulo directamente
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  //getTipoTramite
  createLineChart() {
    const lineCanvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#lineCanvas');
    if (!lineCanvas) {
      console.error('No se encontró el elemento canvas para el gráfico de líneas.');
      return;
    }
  
    const ctx = lineCanvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas para el gráfico de líneas.');
      return;
    }
  
    // Agrupa los datos por tipo de trámite
    const groupedData = this.groupDataByType();
  
    // Organiza los datos para el gráfico
    const chartData = this.prepareChartData(groupedData);
  
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  groupDataByType() {
    return this.data.reduce((result, item) => {
      const key = item.tipo.toLowerCase();
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
  }
  
  prepareChartData(groupedData) {
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
    const datasets = Object.keys(groupedData).map((key, index) => {
      const color = index === 0 ? 'rgba(54, 162, 235, 1)' :  'rgba(255, 99, 132, 1)';
      const data = this.prepareDataForType(groupedData[key]);
      
      return {
        
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar la primera letra
        data,
        borderColor: color,
        fill: false
      };
    });
  
    return { labels, datasets };
  }
  
  prepareDataForType(typeData) {
    const monthlyData = Array.from({ length: 12 }, () => 0);
  
    typeData.forEach(item => {
      const monthIndex = this.getMonthIndex(item.mes);
      if (monthIndex !== -1) {
        monthlyData[monthIndex] = parseInt(item.cantidad_tramites, 10);
      }
    });
  
    return monthlyData;
  }
  
  getMonthIndex(month) {
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return monthNames.indexOf(month.toLowerCase());
  }
  //getTipoTramite

  createPieChart() {
    const pieCanvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#pieCanvas');
    if (!pieCanvas) {
      console.error('No se encontró el elemento canvas para el gráfico de tarta.');
      return;
    }

    const ctx = pieCanvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas para el gráfico de tarta.');
      return;
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completados', 'Detenidos', 'En Proceso'],
        datasets: [{
          label: 'Estado de Trámites',
          data: [this.porcentajecompletado, this.porcentajedetenido, this.porcentajeproceso], // Reemplaza con datos reales
          backgroundColor: [
            '#28a745',   //completados
            '#dc3545', //detenidos
            '#007bff' //en proceso
          ],
          borderColor: [
            'white',
            'white',
            'white'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
  
  createSecondBarChart() {
    const barCanvasTwo: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#barCanvasTwo');
    if (!barCanvasTwo) {
      console.error('No se encontró el elemento canvas para el segundo gráfico de barras.');
      return;
    }
  
    const ctx = barCanvasTwo.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas para el segundo gráfico de barras.');
      return;
    }
  
    // Obtén los datos reales de hombres y mujeres del array 'data'
    // const hombresData = this.data.filter(item => item.sexo === 'Masculino').map(item => parseInt(item.cantidad_tramites));
    // const mujeresData = this.data.filter(item => item.sexo === 'Femenino').map(item => parseInt(item.cantidad_tramites));
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'Varones',
            data: [this.tramites_enero_masculino, this.tramites_febrero_masculino, this.tramites_marzo_masculino, this.tramites_abril_masculino, this.tramites_mayo_maculino, this.tramites_junio_masculino, this.tramites_julio_masculino, this.tramites_agosto_masculino, this.tramites_septiembre_masculino, this.tramites_octubre_masculino, this.tramites_noviembre_masculino, this.tramites_diciembre_masculino, 0],// Reemplaza con datos reales de hombres
            backgroundColor: 'rgba(40, 167, 69, 0.5)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'Mujeres',
            data: [this.tramites_enero_femenino, this.tramites_febrero_femenino, this.tramites_marzo_femenino, this.tramites_abril_femenino, this.tramites_mayo_femenino, this.tramites_junio_femenino, this.tramites_julio_femenino, this.tramites_agosto_femenino, this.tramites_septiembre_femenino, this.tramites_octubre_femenino, this.tramites_noviembre_femenino, this.tramites_diciembre_femenino], // Reemplaza con datos reales de mujeres
            backgroundColor: 'rgba(255, 193, 7, 0.5)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
          },
          y:{
            min: 0,
            beginAtZero: true // Establecer el mínimo del eje Y en 0

          }
        }
      }
    });
  }

  //grafico radar
  createRadarChart() {
    const radarCanvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#radarCanvas');
    if (!radarCanvas) {
      console.error('No se encontró el elemento canvas para el gráfico de radar.');
      return;
    }
  
    const ctx = radarCanvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas para el gráfico de radar.');
      return;
    }
  
    // Obtener las etiquetas y datos dinámicamente desde this.dataRadar
    const labels = this.dataRadar.map(item => item.escuela);
    const dataBachiller = this.dataRadar.map(item => parseInt(item.tipo_1)); // Convertir a números si es necesario
    const dataTitulos = this.dataRadar.map(item => parseInt(item.tipo_2)); // Convertir a números si es necesario
    if (!this.dataRadar || !Array.isArray(this.dataRadar)) {
      console.error('No se encontraron datos válidos en this.dataRadar.');
      return;
    }
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bachiller',
            data: dataBachiller,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Titulos',
            data: dataTitulos,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scale: {
          ticks: { beginAtZero: true }
        }
      }
    });
  }
  

  //polar area
  //CANTIDAD DE TRAMITES
  createPolarAreaChart() {
    const polarCanvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('#polarCanvas');
    if (!polarCanvas) {
      console.error('No se encontró el elemento canvas para el gráfico de área polar.');
      return;
    }

    const ctx = polarCanvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas para el gráfico de área polar.');
      return;
    }


    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Completado', 'Detenido', 'En Proceso'],
        datasets: [
          {
            label: 'Tramites',
            data: [this.cantidacompletado, this.cantidadetenido, this.cantidaproceso],
            backgroundColor: [
              '#28a7469f',   //completados
              '#dc354685', //detenidos
              '#007bff7e' //en proceso
            ],
            borderColor: [
              'white',
              'white',
              'white'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scale: { ticks: { beginAtZero: true } }
      }
    });
  }

  

  //porcenatjes de los estados y cantidad
  getPorcentaje(){

    let fechaActual = new Date();
    let year = fechaActual.getFullYear();

    this.api.getAllPorcentajeTramites(this.anioSeleccionado).subscribe(data => {
      this.dataPorcentaje = data
      console.log("data porcente: ",this.dataPorcentaje)
      if(this.dataPorcentaje[0] === undefined){
        this.porcentajecompletado = 0
        this.cantidacompletado = 0
      }else{
        this.porcentajecompletado = this.dataPorcentaje[0].porcentaje
        this.cantidacompletado = this.dataPorcentaje[0].cantidad
      }
      if(this.dataPorcentaje[1] === undefined){
        this.porcentajedetenido = 0
        this.cantidadetenido = 0        
      }else{
        this.porcentajedetenido = this.dataPorcentaje[1].porcentaje
        this.cantidadetenido = this.dataPorcentaje[1].cantidad
      }
      if(this.dataPorcentaje[2] === undefined){
        this.porcentajeproceso = 0
        this.cantidaproceso = 0
      }else{
        this.porcentajeproceso = this.dataPorcentaje[2].porcentaje
        this.cantidaproceso = this.dataPorcentaje[2].cantidad
      }

      this.cantidad_tramites = Number(this.cantidacompletado) + Number(this.cantidadetenido) + Number(this.cantidaproceso);
      // console.log(this.cantidacompletado)

      this.createPieChart();
      this.createPolarAreaChart()
      
    }
    );
  }

  getRadar(){

    let fechaActual = new Date();
    let year = fechaActual.getFullYear()
    
    this.api.getAllRadarTramites(this.anioSeleccionado).subscribe((data) =>{


      this.dataRadar = data
      console.log(this.dataRadar)

      //metodo jack
      this.createRadarChart()
      });
  }

  getCantidadTipo(){
    let fechaActual = new Date();
    let year = fechaActual.getFullYear()

    this.api.getCantidadTipo(this.anioSeleccionado).subscribe((data) =>{
      this.cantidad_bachiller = data[0].tipo_1
      this.cantidad_titulo = data[0].tipo_2

      this.createChart();
    })
  }

  
}