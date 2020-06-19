import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/services/ordenes.service';
import { Funciones } from 'src/models/funciones';
import { Peliculas } from 'src/models/peliculas';
import { FuncionesService } from 'src/services/funciones.service';
import { PeliculasService } from 'src/services/peliculas.service';
import { Ordenes } from 'src/models/ordenes';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  correo: string;
  ordenes: Array<Ordenes> = new Array<Ordenes>();
  funciones: Array<Funciones> = new Array<Funciones>();
  peliculas: Array<Peliculas> = new Array<Peliculas>();
  constructor(
    private ordenesServicio: OrdenesService,
    private funcionServicio: FuncionesService,
    private peliculaServicio: PeliculasService
  ) { }

  ngOnInit() {
    this.correo = localStorage.getItem('correo');
    this.ordenes = this.ordenesServicio.verOrdenes();
    this.funciones = this.funcionServicio.verFunciones();
    this.peliculas = this.peliculaServicio.verPeliculas();
    console.log(this.ordenes);
    console.log(this.funciones);
    console.log(this.peliculas);
  }

  verOrdenes(){
    let orders: Array<any> = new Array<any>();
    let pelicula: Peliculas;
    let funcion: Funciones;
    this.ordenes.forEach(orden => {
      if (orden.Correo === this.correo && orden.Estado === 1){

        this.funciones.forEach(funtion => {
          if (funtion.id === orden.Funcion){

            this.peliculas.forEach(movie => {
              if (movie.id === funtion.Pelicula) {

                orders.push({
                  Pelicula: movie.Descripcion,
                  Horario: funtion.Inicio + ' - ' + funtion.Fin,
                  Tickets: orden.Tickets,
                  id: orden.id
                });
              }
            });
          }
        });
      }
    });
    console.log(orders);
    return orders;
  }
}
