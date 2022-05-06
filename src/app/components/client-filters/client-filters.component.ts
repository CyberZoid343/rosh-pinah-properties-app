import { MessageModalService } from './../../services/message-modal/message-modal.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-filters',
  templateUrl: './client-filters.component.html',
  styleUrls: ['./client-filters.component.scss']
})
export class ClientFiltersComponent implements OnInit {

  constructor(
    private messageModalService: MessageModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {}

}
