import { Component, OnInit } from '@angular/core';

import { pizzasInfo } from '../../types/pizzas';
import { HttpClient } from '@angular/common/http';
import { PizzasInfoService } from '../pizzas-info.service';
import { PopupControls, PopupControlsService } from '../shared/services/popup-controls.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца", "Десерты", "Напитки"];

  public pizzasData: pizzasInfo.db.Pizzas;
  public customImg:string = '0001.JPG';

  public pizzasInCart: pizzasInfo.db.PizzaInfo[] = [];
  public cartPopup: PopupControls;

  constructor(private http: HttpClient, 
    private pizzasService: PizzasInfoService,
    private popupControlsService: PopupControlsService) { }

  ngOnInit() {
    // this.pizzasService.initServerInfo().then(res => {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasData = data;
      });

    // });
    
    this.initPopup();
  }

  public initPopup() {
    this.cartPopup = this.popupControlsService.create();
  }

  public openPopup(){
    this.cartPopup.open();

    this.initPizzasInCart();
  }

  public closePopup() {
    this.cartPopup.close();
  }

  public addPizzaInCart(pizza: pizzasInfo.db.PizzaInfo) {
    this.pizzasInCart.push(pizza);
  }

  public initPizzasInCart () {
    this.pizzasInCart.forEach(pizza => {
        pizza.pricePerWeight[0].isChecked = true;
        pizza.selectedPrice = pizza.pricePerWeight[0].price;
    });
  }

  public updatePrice(pizza: pizzasInfo.db.PizzaInfo, price) {
    pizza.pricePerWeight.forEach(element => {
      if (element.price == price) {
        pizza.selectedPrice = price;
      } 
    });
  }


}
