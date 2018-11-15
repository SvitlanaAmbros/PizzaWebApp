import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
