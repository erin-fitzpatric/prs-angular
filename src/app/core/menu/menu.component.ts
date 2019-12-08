import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      new MenuItem("Home","/home", "Home"),
      new MenuItem("User","/users/list", "Users List"),
      new MenuItem("Vendor","/vendors/list", "Vendors List"),
      new MenuItem("Product","/products/list", "Products List"),
      new MenuItem("Request","/requests/list", "Requests List"),
      new MenuItem("Review","/requests/review", "Reviews List"),
      new MenuItem("Login","/users/login", "Login"),
      // new MenuItem("About","/about", "About"),
    ];
  }

}
