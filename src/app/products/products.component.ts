import { Component, OnInit } from '@angular/core';

import { entity } from '../../types/entity';
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

  public pizzasData: entity.db.Pizzas;
  public customImg:string = '0001.JPG';

  public pizzasInCart: entity.db.PizzaInfo[] = [];
  public cartPopup: PopupControls;

  public userInfo: entity.UserInfo;

  constructor(private http: HttpClient, 
    private pizzasService: PizzasInfoService,
    private popupControlsService: PopupControlsService) { }

  ngOnInit() {
    // this.pizzasService.initServerInfo().then(res => {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasData = data;
      });

      this.userInfo = {
        name: '',
        phone: ''
      }

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

  public initPizzasInCart () {
    this.pizzasInCart.forEach(pizza => {
        pizza.pricePerWeight[0].isChecked = true;
        pizza.selectedPrice = pizza.pricePerWeight[0].price;
    });
  }

  public addPizzaInCart(pizza: entity.db.PizzaInfo) {
    let pizzaAlreadyAdded: boolean = false;

    this.pizzasInCart.forEach(element => {
      if(element.id == pizza.id) {
        element.quantity += 1;
        pizzaAlreadyAdded = true;
      } 
    });

    if (!pizzaAlreadyAdded) {
      pizza.quantity = 1;
      this.pizzasInCart.push(pizza);
    }
  }

  public updatePrice(pizza: entity.db.PizzaInfo, price) {
    pizza.pricePerWeight.forEach(element => {
      if (element.price == price) {
        pizza.selectedPrice = price;
      } 
    });
  }

  public deletePizza(id: number) {
    this.pizzasInCart.forEach(pizza => {
      if (pizza.id == id) {
        if (pizza.quantity > 1) {
          pizza.quantity--;
        } else {
          this.pizzasInCart = this.pizzasInCart.filter(elem => {
            return elem.id != id;
          });
        }
      }
    });
  }

  public get totalPrice() {
    let price: number = 0;

    this.pizzasInCart.forEach(pizza => {
      price = price + (pizza.quantity * pizza.selectedPrice);
    });

    return price;
  }


  public get isFormDisabled() {
    return this.userInfo.name == '' || this.userInfo.phone == '';
  }
}
