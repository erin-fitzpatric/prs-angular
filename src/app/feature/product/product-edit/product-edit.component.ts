import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent extends BaseComponent implements OnInit {
  title: string = "Product Edit";
  product: Product = new Product();
  id: number = 0;
  vendors: Vendor[] = [];
  constructor(private productSvc: ProductService,
              private router: Router,
              private vendorSvc: VendorService,
              private route: ActivatedRoute,
              private loc: Location,
              protected sysSvc: SystemService) {
                super(sysSvc);
               }
  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    // populate list of vendors
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.productSvc.get(this.id).subscribe(jr => {
      this.product = jr.data as Product;
    });
  }
  save(): void {
    this.productSvc.save(this.product).subscribe(jr => {
      console.log("edited product...");
      console.log(jr);
      console.log(this.product);
      this.router.navigateByUrl("/products/list");
    })
  }
  backClicked(){
    this.loc.back();
  }
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
