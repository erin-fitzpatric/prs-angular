import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent extends BaseComponent implements OnInit {
  titleOne: string = "Request Line-Items";
  titleTwo: string = "Line-Items";
  request: Request = new Request;
  lineItems: LineItem[] = [];
  id: number = 0;
  jr: JsonResponse;

  constructor(private lineItemSvc: LineItemService,
    protected sysSvc: SystemService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.getLineItem();
  }
  getLineItem() {
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.lineItemSvc.listLineItemById(this.id).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
    });
  }
  approve(){
    this.requestSvc.approve(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/review")
    })
  }
  reject(){
    this.requestSvc.reject(this.request).subscribe(jr => {
      this.router.navigateByUrl("/requests/review")
    })
  }
}