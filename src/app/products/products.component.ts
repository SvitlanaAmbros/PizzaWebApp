import { Component, OnInit } from '@angular/core';

import { entity } from '../../types/entity';
import { HttpClient } from '@angular/common/http';
import { PizzasInfoService } from '../pizzas-info.service';
import { PopupControls, PopupControlsService } from '../shared/services/popup-controls.service';
import { OrderCreatorService } from '../order-creator.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

const ORDER_KEY = 'order';
const POPUP_STATE_KEY = 'popup';
const USER_INFO_KEY = 'userInfo';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public menu: string[] = ["Пицца"];
  // , "Десерты", "Напитки"];

  public pizzasData: entity.db.Pizzas;

  public pizzasInCart: entity.db.PizzaInfo[] = [];
  public cartPopup: PopupControls;

  public userInfo: entity.UserInfo;

  constructor( 
    private pizzasService: PizzasInfoService,
    private popupControlsService: PopupControlsService,
    private orderCreatorService: OrderCreatorService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasData = data;
      });

      this.pizzasInCart = this.localStorage.getFromLocalStorage(ORDER_KEY)|| [];
      if (!this.localStorage.getFromLocalStorage(USER_INFO_KEY)) {
        this.createUserInfoData();
      }else {
        this.userInfo = this.localStorage.getFromLocalStorage(USER_INFO_KEY);
      }
    
      this.initPopup();
  }

  public createUserInfoData() {
      this.userInfo = {
        name: '',
        phone: ''
      }
    
  }

  //activation popup
  public initPopup() {
    this.cartPopup = this.popupControlsService.create();

    // let popupState = this.localStorage.getFromLocalStorage(POPUP_STATE_KEY);
    // if (!!popupState) {
    //   popupState ? this.cartPopup.open() : this.cartPopup.close();
    // }
  }

  public openPopup(){
    this.cartPopup.open();
    // this.saveInLocalStorage(POPUP_STATE_KEY, this.cartPopup.isOpened);
    
    // this.initPizzasInCart();
  }

  public closePopup() {
    this.cartPopup.close();
    // this.saveInLocalStorage(POPUP_STATE_KEY, this.cartPopup.isOpened);
  }
//EOF popup 

  public initPizzasInCart () {
    this.pizzasInCart.forEach(pizza => {
        // pizza.pricePerWeight[0].isChecked = true;
        
        
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

    this.initPizzasInCart();

    this.saveInLocalStorage(ORDER_KEY, this.pizzasInCart);
  }

  public updatePrice(pizza: entity.db.PizzaInfo, size) {
    pizza.pricePerWeight.forEach(element => {
      if (element.size == pizza.selectedSize) {
        pizza.selectedPrice = element.price;
        // pizza.selectedSize = element.size;
      } 
    });

    this.saveInLocalStorage(ORDER_KEY, this.pizzasInCart);
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

    this.saveInLocalStorage(ORDER_KEY, this.pizzasInCart);

    if (this.pizzasInCart.length == 0) {
      this.createUserInfoData();
      this.saveInLocalStorage(USER_INFO_KEY, this.userInfo);
    }
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

  public get quantityPizzasInCart() {
    return  this.pizzasInCart.reduce((sum, pizza: entity.db.PizzaInfo) => {
      return sum = sum + pizza.quantity;
    }, 0);
  }

  public updateQuantityInLocalStorage() {
    this.saveInLocalStorage(ORDER_KEY, this.pizzasInCart);
  }

  public updateUserInfoInLocalStorage(){
    this.saveInLocalStorage(USER_INFO_KEY, this.userInfo);
  }

  public sendOrder() {
    this.pizzasService.sendOrderedPizza(this.orderCreatorService.createOrder(
                    this.pizzasInCart, this.userInfo))
          .then((data: {id: string}) => {
            alert(`Order was sent. Order number is ${data.id}`);
            this.cartPopup.close();

            this.createUserInfoData();
            this.pizzasInCart = [];

            this.saveInLocalStorage(ORDER_KEY, this.pizzasInCart);
            this.saveInLocalStorage(USER_INFO_KEY, this.userInfo);
          })
          .catch( err => {
            console.log('Sending order error');
          });
  }

  public saveInLocalStorage(key: string , data: any) {
    this.localStorage.storeInLocalStorage(key, data);
  }

  
}
