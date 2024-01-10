import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../servicios/peliculas.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage {
 
 movies: any=[];
 nombre:any;
 page:number = 1;
  constructor(private peliculaService:PeliculasService) { }
 
  SearchMovie(nombre: any){
    if(nombre && nombre.target && nombre.target.value && nombre.target.value.trim() !== ''){
      this.nombre = nombre.target.value;
      this.page = 1;
      this.movies.length = 0;
    }else {
      this.page++; // Incrementa la página solo si no estás realizando una nueva búsqueda
    }
    
    
    this.peliculaService.movieSearch(this.nombre,this.page).subscribe({
      next:(data:any)=>{
        this.movies.push(...data.results);
        console.log(data);
    },
    error:(error)=>{
      console.log(error);
  }
    })
  }
  onIonInfinite(ev:any) {
    this.SearchMovie(this.nombre);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
