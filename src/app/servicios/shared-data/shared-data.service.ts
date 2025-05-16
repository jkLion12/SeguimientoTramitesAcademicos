import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private valorCompartidoSource = new BehaviorSubject<string>('');
  valorCompartido$ = this.valorCompartidoSource.asObservable();

  setValorCompartido(valor: string) {
    this.valorCompartidoSource.next(valor);
  }

}
