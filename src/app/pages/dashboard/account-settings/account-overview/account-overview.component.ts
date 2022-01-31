import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  id: number = 1;
  role: any = "";
  name: any = "Loading...";
  surname: any = "";
  email: any = "Loading...";
  dateAdded: any = "Loading...";

  loading = true;
  userId = null;
  roleId = null;

  constructor(
    public userService: UserService
    ) { 
    this.getLoggedInUser(this.userService.getUser(this.id))
  }

  ngOnInit(): void {
  }

  getLoggedInUser(id:any){
    this.loading = true;
    this.userService.getUser(id)
      .subscribe(
        (response) => {

          let {
            Id,
            userRole,
            name,
            surname,
            email,
            dateAdded,
          } = response;

          console.log(response)

          this.id = Id;
          this.role = userRole.userRoleName;
          this.name = name;
          this.surname = surname;
          this.email = email;
          this.dateAdded = dateAdded;

          this.loading = false;
        },
        (error) => {
          console.error('error caught in component')
        }
      )
  }

}
