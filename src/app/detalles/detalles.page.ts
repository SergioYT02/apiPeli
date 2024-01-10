import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  movieId: number;
  movieDetails: any;
  castDetails!: any[];

  constructor(private route: ActivatedRoute, private peliculasService: PeliculasService) {
    this.movieId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      console.log('ID en DetallesPage:', movieId);

      if (movieId) {
        this.getPeliculaDetails(movieId);
        this.getCastDetails(movieId);
      } else {
        console.error('ID de película indefinido o nulo.');
      }
    });
  }

  getPeliculaDetails(movieId: number) {
      console.log('Solicitando detalles para la película con ID:', movieId);
    this.peliculasService.moviesDetail(movieId).subscribe({
      next: (data: any) => {
        this.movieDetails = data;
        console.log('Detalles de la película:', this.movieDetails);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getCastDetails(movieId: number) {
    this.peliculasService.moviesCast(movieId).subscribe({
      next: (data: any) => {
        this.castDetails = data.cast;
        console.log('Detalles del Elenco:', this.castDetails);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
