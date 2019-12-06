import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string = "Request-List";
  requests: Request[] = [];
  constructor(private requestSvc: RequestService,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }
  ngOnInit() {
    super.ngOnInit();
    console.log("Calling request service list...");
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log(this.requests);
    });
  }
}
