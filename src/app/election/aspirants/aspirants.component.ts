import {Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-aspirants',
  templateUrl: './aspirants.component.html',
  styleUrls: ['./aspirants.component.scss']
})
export class AspirantsComponent implements OnInit {
  aspirants: any = []
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  baseUrl = environment.baseUrl

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAllAspirants().subscribe((res: any) => {
      this.aspirants = res
      console.log(res)
      for (const re of this.aspirants) {
        if (re) {
          this.apiService.getImage(re.image).subscribe(resp => console.log(resp), error => console.log(error))
        }
      }
    }, error => console.log(error))
  }
}
