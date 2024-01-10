import { Component } from '@angular/core';
import { PeliculasService } from '../servicios/peliculas.service';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  movies:any;
  moviesP:any;
  page:number =0;
  constructor(private peliculasService:PeliculasService, private navCtrl: NavController, private router: Router) {}
 

getMoviesPopular(){
  this.page++;
  this.peliculasService.moviesPopular(this.page).subscribe({
    next:(data:any)=>{
      this.movies=data.results;
      console.log(data);
  },
  error:(error)=>{
    console.log(error);
}
  })
}
ngOnInit(){
  this.getMoviesPopular();
  this.getMoviesUpComing();
  debugger
}


onMovieClick(movieId: number) {
  console.log('Se hizo clic en la película. ID:', movieId);

  if (movieId) {
    this.router.navigate(['/detalles', movieId]);
  } else {
    console.error('ID de película indefinido o nulo.');
  }
}

getMoviesUpComing(){
  this.peliculasService.moviesUpComing().subscribe({
    next:(data:any)=>{
      this.moviesP=data.results;
      console.log(data);
  },
  error:(error)=>{
    console.log(error);
}
  })
 }

 
 onIonInfinite(ev:any) {
  this.getMoviesPopular();
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}
}
