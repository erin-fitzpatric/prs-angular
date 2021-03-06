import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent extends BaseComponent implements OnInit {
  title: string = "Product Create";
  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    protected sysSvc: SystemService) {
      super(sysSvc);
     }

  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    //populate list of vendors
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
      console.log("vendors: ", this.vendors);
    });
  }
  
  save(): void {
    console.log("attempting to save a product:", this.product);
    this.productSvc.save(this.product).subscribe(jr => {
      console.log("saved product...");
      console.log(this.product);
      this.router.navigateByUrl("/products/list");
    })
  }
}
