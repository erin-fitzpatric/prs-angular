import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Product Detail';
  product: Product = new Product();
  id: number = 0;

  constructor(private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysSvc: SystemService) {
      super(sysSvc);
     }
  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    // get the id from the url
    this.route.params.subscribe(parms => this.id = parms['id']);
    // get the product from the product service
    this.productSvc.get(this.id).subscribe(jr => {
      this.product = jr.data as Product;
    });
  }
  delete() {
    this.productSvc.delete(this.id).subscribe(jr => {
      console.log("product delete jr", jr);
      if (jr.errors != null) {
        console.log("Error deleting prodcuts: " + jr.errors);
      }
      this.router.navigateByUrl("products/list");
    });
  }

}
