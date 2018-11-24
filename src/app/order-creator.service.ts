import { Injectable } from '@angular/core';
import { entity} from 'src/types/entity';
import { createProviderInstance } from '@angular/core/src/view/provider';

@Injectable({
  providedIn: 'root'
})

export class OrderCreatorService {

  constructor() { }

  public createOrder(pizzas: entity.db.PizzaInfo[], user: entity.UserInfo): entity.db.Order {
    let order = {
      user : this.createUser(user),
      pizzas: this.createPizzas(pizzas),
      totalSum : this.createTotalPrice(pizzas)
    }

    return order;
  }

  public createUser(user: entity.UserInfo) : entity.db.UserInfo {
    let userDb:entity.db.UserInfo = {
      name: user.name,
      phone: user.phone
    } 

    return userDb;
  }

  public createPizzas(pizzas: entity.db.PizzaInfo[]): 
                        {[key:number]: entity.db.PricePerWeight} {

    let obj: {[key:number]: entity.db.PricePerWeight} = {};
    pizzas.forEach(pizza => {
      obj[pizza.id] = {
        price: pizza.selectedPrice,
        size: pizza.selectedSize
      }
    });
    
    return obj;
  }

  public createTotalPrice(pizzas: entity.db.PizzaInfo[]): number {
    let totalPrice: number;

    totalPrice = pizzas.reduce((acc, curr: entity.db.PizzaInfo) => {
      return acc + curr.quantity * curr.selectedPrice
    }, 0);

    return totalPrice;
  }

}
