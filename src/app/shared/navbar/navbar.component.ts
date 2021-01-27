import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor(private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        command: () => this.router.navigateByUrl('/dashboard')
      },
      {
        label: 'Election',
        command: () => this.router.navigateByUrl('/election')
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-user',
        // items: [
        //   {
        //     label: 'New',
        //     icon: 'pi pi-fw pi-user-plus',
        //     command: () => this.addStaff()
        //   },
        //   // {
        //   //   label: 'Delete',
        //   //   icon: 'pi pi-fw pi-user-minus',
        //
        //   // },
        // ]
      },
      {
        label: 'Members',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            command: () => this.addMembers()
          },
          // {
          //   label: 'Delete',
          //   icon: 'pi pi-fw pi-user-minus',

          // },
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout()
      }
    ];
  }

  addStaff(): void {
    this.storageService.addStaffDialog = true;
  }

  addMembers(): void {
    this.storageService.addMemberDialog = true;
  }

  logout(): void {
    this.storageService.clearLocalStorage();
    this.router.navigateByUrl('/login')
  }

}
