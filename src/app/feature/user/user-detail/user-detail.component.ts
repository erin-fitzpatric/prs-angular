import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title: string = 'User Detail';
  user: User = new User();
  id: number = 0;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location) { }

  ngOnInit() {
       // get the id from the url
       this.route.params.subscribe(parms => this.id = parms['id']);
       // get the user from the user service
       this.userSvc.get(this.id).subscribe(jr => {
         this.user = jr.data as User;
       });
  }

  delete() {
    this.userSvc.delete(this.id).subscribe( jr => {
      console.log("user delete jr",jr);
      // fix here. 
      if (jr.errors != null) {
        console.log("Error deleting users: "+jr.errors);
      }
      this.router.navigateByUrl("users/list");
    });
  }

}
