import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TekgainComponentRoutingModule } from './tekgain-component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    TekgainComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule
  ]
})
export class TekgainComponentModule { }
