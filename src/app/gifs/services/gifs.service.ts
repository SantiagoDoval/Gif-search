import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _apiKey:string='G7eSSB1RQ2mOtFn0gmY7UiswGRdtUJ4Y';
  private _UrlService:string='https://api.giphy.com/v1/gifs';

  private _historial:string[]=[];

  public resultados:Gif[]=[]

  get historial(){    
    return [...this._historial]
  }

  constructor(private http:HttpClient){

    this._historial=JSON.parse(localStorage.getItem('data')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('gifs')!) || [];
    // if(localStorage.getItem('data')){
    //   this._historial=JSON.parse(localStorage.getItem('data'));
    // }

  }

  buscarGifs( query:string ){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift( query );      
      this._historial=this._historial.splice(0,10)

      localStorage.setItem('data',JSON.stringify(this._historial))
    }
  
    const params=new HttpParams().set('api_key',this._apiKey).set('limit','10').set('q',query);
    console.log(params.toString())
    this.http.get<SearchGifsResponse>(`${this._UrlService}/search`,{params})
      .subscribe((resp)=>{
        //console.log(resp.data)
        this.resultados=resp.data;
        localStorage.setItem('gifs',JSON.stringify(this.resultados))
      })
    
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=G7eSSB1RQ2mOtFn0gmY7UiswGRdtUJ4Y&q=dragon ball z&limit=10`)
    // .then(resp=>{
    //   resp.json().then(data=>{
    //     console.log(data)
    //   })
    // })
    

  }
}
