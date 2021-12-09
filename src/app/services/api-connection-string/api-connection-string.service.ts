import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionStringService {

  constructor() { }

  apiConnectionString = "https://roshpinahpropertieswebapi20211206152720.azurewebsites.net/api/";
}
