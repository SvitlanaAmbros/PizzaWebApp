import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { FormPopupComponent } from './popup/form-popup/form-popup.component';
import { PopupControls, PopupControlsService } from './services/popup-controls.service';



@NgModule({
  declarations: [
    FormPopupComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PopupControls,
      PopupControlsService
  ],
  exports: [
      FormPopupComponent
  ]
})

export class SharedModule { }
