import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent extends BaseComponent implements OnInit {
  title: string = "Request-Review"
  requests: Request[] = [];
  constructor(private requestSvc: RequestService,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }
  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    console.log("Calling request review service list...");
    this.requestSvc.requestForReview(this.loggedInUser.id).subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log(this.requests);
    });
  }
}
