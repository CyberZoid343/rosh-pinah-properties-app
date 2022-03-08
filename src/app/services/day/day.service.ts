import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  today = new Date()

  constructor() { }

  getDateDays(date: Date){
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = this.today.getTime() - new Date(date).getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays == 1){
      return {
        "message": "Today",
        "days": diffInDays
      }
    }
    else if (diffInDays == 2){
      return {
        "message": "Yesterday",
        "days": diffInDays
      }
    }
    else if (diffInDays == 0){
      return {
        "message": "Tomorrow",
        "days": diffInDays
      }
    }
    else if (diffInDays > 2){
      return {
        "message": diffInDays.toString() + " days ago",
        "days": diffInDays
      }
    }
    else if (diffInDays <= -1){
      return {
        "message": "Due in " + (diffInDays * -1 + 1).toString() + " days",
        "days": diffInDays
      }
    }
    else{
      return {
        "message": "Days",
        "days": diffInDays
      }
    }
  }
}
