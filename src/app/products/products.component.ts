import { Component, OnInit } from '@angular/core';

import { pizzasInfo } from '../../types/pizzas';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца", "Десерты", "Напитки"];

  public pizzasInfo: pizzasInfo.db.Pizzas;
  public customImg:string = '0001.JPG';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/init'); 
    this.http.get('http://localhost:8080/pizzas')
      .subscribe((data: any) => {this.pizzasInfo = data; console.log (this.pizzasInfo); });
    
    // this.http.get('http://localhost:8080/pizzas').pipe(map(data => {
    //   this.pizzasInfo = data;
    //   console.log(this.pizzasInfo);
    // }));



  }
}
