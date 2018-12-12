import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  public storeInLocalStorage(key: string, data: any) {
    this.storage.set(key, data);
  }

  public getFromLocalStorage(key: string) {
    return this.storage.get(key);
  }
}
