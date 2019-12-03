import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})
export class BaseComponent implements OnInit {
  sortCriteria: string = "id";
  sortOrder: string = "asc";

  constructor() { }

  ngOnInit() {
    
  }
  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
