import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../services/auth-guard.service';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import {AddStaffComponent} from './add-staff/add-staff.component';
import {AddMembersComponent} from './add-members/add-members.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SharedModule} from "../shared/shared.module";


const routes: Routes = [{path: '', component: DashboardComponent, canActivate: [AuthGuardService]}];

@NgModule({
  declarations: [DashboardComponent, AddStaffComponent, AddMembersComponent],
  imports: [
    CommonModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    RouterModule.forChild(routes),
    MenubarModule,
    InputNumberModule,
    PasswordModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class DashboardModule {
}
