import { Component, OnInit } from '@angular/core';

import { pizzasInfo } from '../../types/pizzas';
import { HttpClient } from '@angular/common/http';
import { PizzasInfoService } from '../pizzas-info.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца", "Десерты", "Напитки"];

  public pizzasInfo: pizzasInfo.db.Pizzas;
  public customImg:string = '0001.JPG';

  constructor(private http: HttpClient, 
    private pizzasService: PizzasInfoService) { }

  ngOnInit() {
    this.pizzasService.initServerInfo().then(res => {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasInfo = data;
      });
    });

    // this.http.get('http://localhost:8080/init').toPromise().then(data => {
    //   this.http.get('http://localhost:8080/pizzas')
    //   .subscribe((data: any) => {this.pizzasInfo = data; console.log (this.pizzasInfo); });
    // }); 

    // this.http.get('http://localhost:8080/init')
    //   .subscribe( (res) => {
    //     console.log(res);
    //     this.http.get('http://localhost:8080/pizzas')
    //       .subscribe((data: pizzasInfo.db.Pizzas) => {
    //         console.log(data);
    //         this.pizzasInfo = data;
    //       });
    //   })
    // let promise  = new Promise ((resolve, reject) => {
    //   this.http.get('http://localhost:8080/pizzas').subscribe((res) => {
    //     console.log(res);
    //   });
    // })


    
    
    // this.http.get('http://localhost:8080/pizzas').pipe(map(data => {
    //   this.pizzasInfo = data;
    //   console.log(this.pizzasInfo);
    // }));



  }
}
