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

  public pizzasInfo: pizzasInfo.db.Pizzas;
  public customImg:string = '0001.JPG';

  public cartPopup: PopupControls;

  constructor(private http: HttpClient, 
    private pizzasService: PizzasInfoService,
    private popupControlsService: PopupControlsService) { }

  ngOnInit() {
    // this.pizzasService.initServerInfo().then(res => {
      this.pizzasService.getPizzasList().then(data => {
        this.pizzasInfo = data;
      });

    // });
    
    this.initPopup();
  }

  public initPopup() {
    this.cartPopup = this.popupControlsService.create();
  }

  public openPopup(){
    this.cartPopup.open();
  }

  public closePopup() {
    this.cartPopup.close();
  }



}
