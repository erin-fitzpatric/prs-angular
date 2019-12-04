import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { Product } from '../model/product.class';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8080/products/";
  constructor(private http: HttpClient) { }
  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }
  get(id: number): Observable<JsonResponse>{
    return this.http.get(this.url+id) as Observable<JsonResponse>;
  }
  save(product: Product): Observable<JsonResponse> {
    return this.http.post(this.url, product) as Observable<JsonResponse>;
  }
  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url+id) as Observable<JsonResponse>;
  }
}
