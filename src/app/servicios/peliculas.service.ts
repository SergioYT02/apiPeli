import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

   
  constructor(private http:HttpClient) { }

 moviesPopular(page:number){
 return this.http.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page='+page+'&api_key=019b9b771295578cc66550f2133cde80');

 }

moviesUpComing(){
  return this.http.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=019b9b771295578cc66550f2133cde80');
}

moviesDetail(id: number){
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=019b9b771295578cc66550f2133cde80`);
}

moviesCast(id: number) {
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=019b9b771295578cc66550f2133cde80`);
}

movieSearch(nombre:string, page:number){
  return this.http.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=`+page+`&api_key=019b9b771295578cc66550f2133cde80&query=`+nombre)
}





}
