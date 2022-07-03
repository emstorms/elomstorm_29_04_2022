import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceMessageService {

  message !: string;

  constructor() { }
}
