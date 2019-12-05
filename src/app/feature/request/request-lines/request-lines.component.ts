import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  title: string = "Line-Items";
  lineItems: LineItem[] = [];
  constructor(private lineItemSvc: LineItemService,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }
  ngOnInit() {
    super.ngOnInit();
    console.log("Calling line item service list...");
    this.lineItemSvc.list().subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
      console.log(this.lineItems);
    });
  }
}
