import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-clients-form',
  templateUrl: './filter-clients-form.component.html',
  styleUrls: ['./filter-clients-form.component.scss']
})
export class FilterClientsFormComponent implements OnInit {

  @Input() showFilters = true;
  @Input() total = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
