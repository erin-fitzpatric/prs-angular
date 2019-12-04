import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product Edit";
  product: Product = new Product();
  id: number = 0;
  constructor(private productSvc: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location) { }
  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.productSvc.get(this.id).subscribe(jr => {
      this.product = jr.data as Product;
    })
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
}
