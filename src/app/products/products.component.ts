import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца", "Десерты", "Напитки"];

  public customImg:string = '0001.JPG';
  constructor() { }

  ngOnInit() {
  }

}
