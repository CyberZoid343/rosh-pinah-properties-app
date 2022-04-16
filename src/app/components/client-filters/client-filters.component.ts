import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { UserService } from 'src/app/services/user/user.service';
import { Tag, User } from 'src/app/interfaces';
import { ClientsComponent } from 'src/app/views/clients/clients.component';

@Component({
  selector: 'app-client-filters',
  templateUrl: './client-filters.component.html',
  styleUrls: ['./client-filters.component.scss']
})
export class ClientFiltersComponent implements OnInit {

  gettingTagSet = false;
  tagSubscription: Subscription = new Subscription;
  userSubscription: Subscription = new Subscription;
  tags!: Tag[];
  users!: User[];
  loadingTagsMessage = "Loading tags..."
  form: FormGroup;
  gettingUserSet = false;

  //filters
  order: string = '';
  status: string = '';
  followUp: string = '';
  lastContacted: string = '';
  filterTags: string = '';

  constructor(
    public tagService: TagService,
    public snackBarService: SnackBarService,
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public clients: ClientsComponent
  ) {
    this.form = this.formBuilder.group({
      tags: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.getTagSet();
    this.getUserSet();
  }

  setFilters() {
    this.route.queryParams.subscribe(params => {

      if (params['tags'] != undefined) {
        let tags = params['tags'];
        (this.form.controls.tags as FormArray).clear();
        tags.split(",")!.forEach((tag: any) => {
          (this.form.controls.tags as FormArray).push(new FormControl(tag))
        });
      }
      else {
        (this.form.controls.tags as FormArray).clear();
      }

      if (params['order'] != undefined) {
        this.order = params['order'].replace("_", " ");
      }
      else {
        this.order = "Date Added";
      }

      if (params['status'] != undefined) {
        this.status = params['status'].replace("_", " ");
      }
      else {
        this.status = "all";
      }

      if (params['follow_up'] != undefined) {
        this.followUp = params['follow_up'].replace("_", " ");
      }
      else {
        this.followUp = "all";
      }

      if (params['last_contacted'] != undefined) {
        this.lastContacted = params['last_contacted'].replace("_", " ");
      }
      else {
        this.lastContacted = "all";
      }

      if (params['tags'] != undefined) {
        this.filterTags = params['tags'].replace("_", " ");
      }
      else {
        this.filterTags = "";
      }

    });
  }

  getTagSet() {
    this.gettingTagSet = true;
    this.tagSubscription = this.tagService.getTagSet().subscribe(
      (response) => {
        this.tags = response;
        this.gettingTagSet = false;
        this.setFilters();
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  toggleTag(event: any) {
    const tags = (this.form.controls.tags as FormArray)
    if (event.target.checked) {
      tags.push(new FormControl(event.target.value))
    }
    else {
      const index = tags.controls.findIndex(x => x.value === event.target.value)
      tags.removeAt(index);
    }
    this.filterByTag();
  }

  buildTagListString() {
    const tags = (this.form.controls.tags as FormArray)
    let str = ''
    tags.controls.forEach(tag => {
      if (tag.value != '') {
        str += tag.value + ',';
      }
    });
    str = str.slice(0, -1);
    return str;
  }

  checkTag(tagName: string) {
    const tags = (this.form.controls.tags as FormArray)
    const index = tags.controls.findIndex(x => x.value === tagName)
    if (index > -1) {
      return true
    }
    else {
      return false
    }
  }

  filterByTag() {
    this.router.navigate([], {
      queryParams: {
        tags: this.buildTagListString()
      },
      queryParamsHandling: 'merge',
    });
  }

  getUserSet() {
    this.gettingUserSet = true;
    this.userSubscription = this.userService.getUserSet().subscribe(
      (response) => {
        console.log(response)
        this.users = response;
        this.gettingUserSet = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  filterByLastEditor(event: any) {
    this.router.navigate([], {
      queryParams: {
        lastEditor: event.target.value
      },
      queryParamsHandling: 'merge',
    });
  }

  refreshClientList() {
    this.clients.getClientSet();
  }

  clearFilters() {
    this.router.navigate([]);
  }

  searchClients(event: any) {
    this.router.navigate([], {
      queryParams: {
        search: event.target.value
      },
      queryParamsHandling: 'merge',
    });
  }

  orderBy(order: string) {
    this.router.navigate([], {
      queryParams: {
        order: order,
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByStatus(status: string) {
    this.router.navigate([], {
      queryParams: {
        status: status
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByFollowUpPeriod(period: string) {
    this.router.navigate([], {
      queryParams: {
        follow_up: period,
        last_contacted: 'all'
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByLastContactedPeriod(period: string) {
    this.router.navigate([], {
      queryParams: {
        last_contacted: period,
        follow_up: 'all'
      },
      queryParamsHandling: 'merge',
    });
  }
}
