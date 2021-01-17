import {Component, OnInit, ViewChild} from '@angular/core';
import {Members} from '../members';
import {CustomerService} from '../customerservice';
import {Table} from 'primeng/table';
import {ApiService} from '../../services/api.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StorageService} from '../../services/storage.service';
import {MemberModel} from '../../models/member.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  members: Members[];
  loading = true;
  dateSelected: boolean;

  today = new Date();
  month = this.today.getMonth();
  thisYear = this.today.getFullYear();
  prevMonth = (this.month === 0) ? 11 : this.month - 1;
  prevYear = (this.prevMonth === 11) ? this.thisYear - 1 : this.thisYear;
  nextMonth = (this.month === 11) ? 0 : this.month + 1;
  nextYear = (this.nextMonth === 0) ? this.thisYear + 1 : this.thisYear;
  yearRange = `${this.prevYear}:${this.nextYear}`

  @ViewChild('dt') table: Table;

  constructor(
    private customerService: CustomerService,
    private apiService: ApiService,
    private messageService: MessageService,
    public storageService: StorageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  onActivityChange(event): void {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value, 10);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value): void {
    this.table.filter(this.formatDate(value), 'date', 'equals');
  }

  formatDate(date): any {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event): void {
    this.table.filter(event.value, 'representative', 'in');
  }

  getAllMembers(): void {
    this.apiService.getAllMembers().subscribe((resp: Members[]) => {
      this.storageService.membersData = resp;
      this.loading = false;
      // console.log(resp);
    }, error => {
      this.loading = false;
      this.messageService.add({
        key: 'bc',
        severity: 'info',
        summary: 'Info',
        detail: 'No Members Available',
        sticky: true
      });
      console.log(error);
    });
  }

  updateMemberData(data: MemberModel): void {
    if (this.dateSelected) {
      this.apiService.updateMemberData(data).subscribe(res => this.successMessage(res), err => console.log(err));
    }
    // console.log(data)
  }

  successMessage(data?: Members, message: string = 'has been updated successfully'): void {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: `Data of ${data.surname} ${data.otherNames} ${message}`,
      life: 3000
    });
  }

  deleteMember(member: Members): void {
    console.log(member)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + member.surname + ' ' + member.otherNames + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storageService.membersData = this.storageService.membersData.filter(val => val["id"] !== member["id"]);
        this.apiService.deleteMember(member).subscribe(() => this.successMessage(member, 'has been deleted successfully'))
      }
    });
    // this.successMessage(member, 'has been deleted successfully')
    // console.log(member)
  }

  calenderOpened(): void {
    this.dateSelected = false
    console.log(this.dateSelected)
  }

  calenderEdited(): void {
    this.dateSelected = true
    console.log(this.dateSelected)
  }

  linkedIn(): void {
    window.open('https://www.linkedin.com/in/thehinneh/', '_blank');
  }
}
