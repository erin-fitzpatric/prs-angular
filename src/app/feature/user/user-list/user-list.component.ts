import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {
  title: string = "User-List";
  users: User[] = [];

  constructor(private userSvc: UserService,
              protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    console.log("Verify we have a logged in user!");
    console.log("User:",this.loggedInUser);
    console.log("Admin?",this.isAdmin);
    console.log("Reviewer?",this.isReviewer);
    console.log("Calling user service list...");
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      console.log(this.users);
    });
  }

}
