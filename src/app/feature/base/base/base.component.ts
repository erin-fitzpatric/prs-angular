import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  template: ''
})
export class BaseComponent implements OnInit {
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  loggedInUser: User = null;
  isAdmin: boolean;
  isReviewer: boolean;
  constructor(protected sysSvc: SystemService) { }
  ngOnInit() {
    // verify that the user is logged in
    this.sysSvc.checkLogin();
    // set the system user credentials in the current component
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.sysSvc.isAdmin();
    this.isReviewer = this.sysSvc.isReviewer();
  }
  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
