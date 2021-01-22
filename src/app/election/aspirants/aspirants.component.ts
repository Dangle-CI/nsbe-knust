import {Component, Input, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-aspirants',
  templateUrl: './aspirants.component.html',
  styleUrls: ['./aspirants.component.scss']
})
export class AspirantsComponent implements OnInit {
  @Input() aspirants: any
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;


  constructor() {
  }

  ngOnInit(): void {
  }

}
