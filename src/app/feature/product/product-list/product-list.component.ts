import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { BaseComponent } from '../../base/base/base.component';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit {
  title: string = "Product-List";
  products: Product[] = [];
  constructor(private productSvc: ProductService,
              protected sysSvc: SystemService) {
    super(sysSvc);
   }
  ngOnInit() {
    super.ngOnInit();
    console.log("Calling product service list...");
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log(this.products);
    });
  }

}
