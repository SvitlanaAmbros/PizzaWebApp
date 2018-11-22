import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';

import { HttpClientModule }   from '@angular/common/http';
import { SharedModule } from './shared/shared.module.';
import { PizzasInfoService } from './pizzas-info.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    ProductsComponent,
    RestaurantsComponent,
    CustomFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    SharedModule
  ],
  providers: [PizzasInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
