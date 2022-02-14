import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  showErrorSnackBar(message: string){

    var duration = 5000;

    if (message == '[object ProgressEvent]'){
      message = "Error: Connection to server lost. Check your internet connection or contact IT support for additional help."
      duration = 100000000;
    }

    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['alert', 'alert-danger'],
    });
  }

  showSuccessSnackBar(message: string){

    var duration = 5000;

    if (message == '[object ProgressEvent]'){
      message = "Error: Connection to server lost. Check your internet connection or contact IT support for additional help."
      duration = 100000000;
    }

    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['alert', 'alert-success'],
    });
  }

}
