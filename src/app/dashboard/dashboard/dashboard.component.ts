import {Component, OnInit, ViewChild} from '@angular/core';
import {Members} from '../members';
import {CustomerService} from '../customerservice';
import {Table} from 'primeng/table';
import {ApiService} from '../../services/api.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalZonesModel, RegionalZonesModel} from '../../models/zones.model';
import {StorageService} from '../../services/storage.service';
import {MemberModel} from '../../models/member.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  // members: Members[];
  cols: any[];
  exportColumns: any[];
  localZones: any[];
  regionalZones: any[];
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

    this.localZones = LocalZonesModel;
    this.regionalZones = RegionalZonesModel;

    this.cols = [
      {field: 'surname', header: 'Surname'},
      {field: 'otherNames', header: 'Other Names'},
      {field: 'mobile', header: 'Mobile'},
      {field: 'email', header: 'Email'},
      {field: 'localZone', header: 'Local Zone'},
      {field: 'regionalZone', header: 'Regional Zone'},
      {field: 'attendance', header: 'Attendance'},
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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
      let response = [];
      for (const attendance of resp) {
        if (attendance.attendance && attendance.attendance.length) {
          for (let i = 0; i < attendance.attendance.length; i++) {
            attendance.attendance[i] = new Date(attendance.attendance[i]);
          }
        }
        response.push(attendance);
      }
      this.storageService.membersData = response;
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

  // exportPdf(): void {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'cm');
  //       doc.table(0, 0, this.exportColumns, this.customers);
  //       doc.autoPrint({variant: 'javascript'});
  //       doc.save('products.pdf');
  //     });
  //   });
  // }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.storageService.membersData);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'members');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  linkedIn(): void {
    window.open('https://www.linkedin.com/in/thehinneh/', '_blank');
  }
}
