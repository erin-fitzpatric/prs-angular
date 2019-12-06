import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from 'src/app/service/request.service';
import { BaseComponent } from '../../base/base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { Request} from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent extends BaseComponent implements OnInit {
  title: string = "Line-Item Create";
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  request: Request = new Request();
  id: number = 0;

  constructor(private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysService: SystemService) { 
      super(sysService)
    }

  ngOnInit() {
    console.log(this.lineItem)
    //populate list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products);
    });
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
  }

  save(): void {
    console.log("attempting to save line item:", this.lineItem);
    this.lineItem.request = this.request;
    this.lineItemSvc.save(this.lineItem).subscribe(jr => {
      console.log("saved line-item...");
      console.log(this.lineItem);
      this.router.navigateByUrl("/requests/lines/"+this.id);
    })
  }
}
