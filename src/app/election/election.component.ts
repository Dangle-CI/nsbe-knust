import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  aspirantsForm = new FormGroup({
    position: new FormControl('', Validators.required),
    memberId: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  image

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  createAspirant() {
    // const form = this.aspirantsForm.value
    // const data = new FormData()
    // data.append('0', form.image, form.image.name)
    // form.image = data
    // this.apiService.createAspirant(this.aspirantsForm.value).subscribe(res => console.log(res), err => console.log(err))
    // console.log(form)
  }

  onBasicUpload(event) {
    console.log(event)
  }

  onFileChange(fileChangeEvent) {
    this.image = fileChangeEvent.target.files[0];
    console.log(fileChangeEvent)
  }
}
