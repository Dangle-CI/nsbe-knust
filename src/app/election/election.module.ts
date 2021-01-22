import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElectionComponent} from './election.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../services/auth-guard.service";
import {FileUploadModule} from 'primeng/fileupload';
import {CardModule} from "primeng/card";
import {AspirantsComponent} from './aspirants/aspirants.component';
import {PaginatorModule} from "primeng/paginator";
import {DataViewModule} from 'primeng/dataview';
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [{path: '', component: ElectionComponent, canActivate: [AuthGuardService]}];


@NgModule({
  declarations: [ElectionComponent, AspirantsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    CardModule,
    PaginatorModule,
    DataViewModule,
    SharedModule
  ]
})
export class ElectionModule {
}
