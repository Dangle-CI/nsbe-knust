import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss'],
  providers: [MessageService]
})
export class ElectionComponent implements OnInit {
  aspirantsForm = new FormGroup({
    position: new FormControl('', Validators.required),
    memberId: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  image: any
  loading: boolean

  constructor(private apiService: ApiService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  createAspirant() {
    this.loading = true;
    const formData = new FormData()
    formData.append('image', this.image, this.image.name)
    this.apiService.imageUpload(formData).subscribe(resp => {
      this.aspirantsForm.patchValue({image: resp.data.filename})
      this.apiService.createAspirant(this.aspirantsForm.value).subscribe(res => {
        console.log(res)
        this.loading = false
        this.successMessage()
      }, err => {
        this.errorMessage(err.error.message)
        this.loading = false
        console.log(err)
      })
    }, error => {
      console.log(error)
      this.loading = false
      this.errorMessage()
    })
  }

  onBasicUpload(event) {
    console.log(event)
  }

  onFileChange(fileChangeEvent) {
    this.image = fileChangeEvent.target.files[0]
    console.log(this.image)
    // const formData = new FormData()
    // formData.append('image', fileChangeEvent.target.files, fileChangeEvent.target.files.name)
  }

  successMessage(): void {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: `Aspirant has been added successfully`
    });
  }

  errorMessage(message = 'Sorry, an error occurred. Please try again'): void {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
