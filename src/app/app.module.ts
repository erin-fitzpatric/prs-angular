import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/menu/menu.component';
import { SortPipe } from './pipe/sort.pipe';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { BaseComponent } from './feature/base/base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SortPipe,
    UserListComponent,
    BaseComponent,
    VendorListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
