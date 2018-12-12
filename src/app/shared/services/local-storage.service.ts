import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { entity } from 'src/types/entity';


const ORDER_KEY = 'order';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  public storeInLocalStorage(order: entity.db.PizzaInfo[]) {
    console.log('storage', order);
    this.storage.set(ORDER_KEY, order);
  }

  public getFromLocalStorage() {
    let res = this.storage.get(ORDER_KEY) || [];

    return res;
  }
}
