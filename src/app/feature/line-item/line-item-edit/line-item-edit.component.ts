import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base/base.component';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent extends BaseComponent implements OnInit {
  title: string = "Line-Item Edit";
  lineItem: LineItem = new LineItem();
  id: number = 0;
  products: Product[] = [];
  constructor(private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysService: SystemService) {
    super(sysService)
  }

  ngOnInit() {
    //populate list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products);
    });
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.lineItemSvc.get(this.id).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
  }
  save(): void {
    console.log("attempting to save line item:", this.lineItem);
    this.lineItemSvc.save(this.lineItem).subscribe(jr => {
      console.log("saved line-item...");
      console.log(this.lineItem);
      this.router.navigateByUrl("/requests/lines/" + this.id);
    })
  }
  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
