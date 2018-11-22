import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupControls {

  public isOpened: boolean;

  constructor() {
    this.isOpened = false;
  }

  public open() {
    this.isOpened = true;
  }

  public close() {
    this.isOpened = false;
  }
}

@Injectable()
export class PopupControlsService {

    constructor() {}

    public create(): PopupControls {
        return new PopupControls();
    }

}
