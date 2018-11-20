import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pizzasInfo } from 'src/types/pizzas';

@Injectable({
  providedIn: 'root'
})

export class PizzasInfoService {

  private URL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public initServerInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get( `${this.URL}init`)
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          console.log('Init server data Error');
          reject(err);
        });
    });
  }

  public getPizzasList(): Promise<pizzasInfo.db.Pizzas>{
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}pizzas`)
        .subscribe((res: pizzasInfo.db.Pizzas) => {
          resolve(res);
        }, (err) => {
          console.log('Getting pizzas error');
          reject(err);
        });
    });
  }


}
