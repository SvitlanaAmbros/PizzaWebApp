import { Component, OnInit } from '@angular/core';

import { entity } from '../../types/entity';
import { HttpClient } from '@angular/common/http';
import { PizzasInfoService } from '../pizzas-info.service';
import { PopupControls, PopupControlsService } from '../shared/services/popup-controls.service';
import { OrderCreatorService } from '../order-creator.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца"];
  // , "Десерты", "Напитки"];

  public pizzasData: entity.db.Pizzas;
  public customImg:string = '0001.JPG';

  public pizzasInCart: entity.db.PizzaInfo[] = [];
  public cartPopup: PopupControls;

  public userInfo: entity.UserInfo;

  constructor(private http: HttpClient, 
    private pizzasService: PizzasInfoService,
    private popupControlsService: PopupControlsService,
    private orderCreatorService: OrderCreatorService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasData = data;
      });

      this.pizzasInCart = this.localStorage.getFromLocalStorage();

      this.userInfo = {
        name: '',
        phone: ''
      }
    
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
        pizza.selectedSize = pizza.pricePerWeight[0].size;
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

    this.updateOrderInLocalStorage();
  }

  public updatePrice(pizza: entity.db.PizzaInfo, size) {
    // console.log('!!!', size);
    pizza.pricePerWeight.forEach(element => {
      if (element.size == size) {
        // console.log('!!!', element.price);
        pizza.selectedPrice = element.price;
        pizza.selectedSize = element.size;
      } 
    });

    this.updateOrderInLocalStorage();
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

    this.updateOrderInLocalStorage();
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

  public sendOrder() {
    
    this.pizzasService.sendOrderedPizza(this.orderCreatorService.createOrder(
          this.pizzasInCart, this.userInfo));
  }

  public updateOrderInLocalStorage() {
    this.localStorage.storeInLocalStorage(this.pizzasInCart);
  }
}
