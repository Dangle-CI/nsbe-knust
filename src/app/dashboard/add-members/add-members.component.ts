import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
  providers: [MessageService]
})
export class AddMembersComponent implements OnInit {
  membersForm = new FormGroup({
    surname: new FormControl('', Validators.required),
    otherNames: new FormControl('', Validators.required),
    mobile: new FormControl(null, [Validators.maxLength(10)]),
    email: new FormControl(''),
    programme: new FormControl(''),
    regDate: new FormControl(''),
    memberId: new FormControl('', Validators.required),
  });
  loading: boolean;
  today = new Date();
  month = this.today.getMonth();
  thisYear = this.today.getFullYear();
  yearRange = `1998:${this.thisYear}`;

  constructor(public storageService: StorageService, private apiService: ApiService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  addMember(): any {
    if (this.membersForm.valid) {
      this.loading = true;
      const mobile = `233${this.membersForm.get('mobile').value.substring(1)}`;
      const regDate = new Date();
      const data = {
        regDate: this.membersForm.value.regDate || regDate,
        email: this.membersForm.value.email,
        memberId: this.membersForm.value.memberId,
        mobile,
        otherNames: this.membersForm.value.otherNames,
        programme: this.membersForm.value.programme,
        surname: this.membersForm.value.surname
      };
      // console.log(this.membersForm.value, data);
      this.apiService.addMembers(data).subscribe(
        resp => {
          this.successMessage();
          this.getAllMembers();
          this.membersForm.reset();
          this.loading = false;
          console.log(resp);
        }, err => {
          this.errorMessage();
          this.loading = false;
          console.log(err);
        }
      );
    } else {
      this.errorMessage('Please complete member details');
    }
  }

  successMessage(): void {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: `${this.membersForm.get('surname').value.toUpperCase()} ${this.membersForm.get('otherNames').value} has been added successfully`
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

  getAllMembers(): void {
    this.apiService.getAllMembers().subscribe(resp => {
      this.storageService.membersData = resp;
    }, () => {
      this.messageService.add({
        key: 'bc',
        severity: 'info',
        summary: 'Info',
        detail: 'Unable to fetch data',
        sticky: true
      });
    });
  }
}
