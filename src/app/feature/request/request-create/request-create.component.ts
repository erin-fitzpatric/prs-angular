import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();

  constructor(private requestSvc: RequestService,
    private router: Router,
    protected sysSvc: SystemService) { }
  ngOnInit() {
    this.request.user = this.sysSvc.loggedInUser;
  }
  save(): void {
    console.log("attempting to save a request", this.request);
    this.requestSvc.save(this.request).subscribe(jr => {
      console.log("saved request...");
      console.log(this.request);
      this.router.navigateByUrl("/requests/list");
    })
  }
}
