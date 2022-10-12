import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';


import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { HomeComponent } from './components/home/home.component';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuMangementComponent } from './components/menu-mangement/menu-mangement.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { ViewDishComponent } from './components/view-dish/view-dish.component';



@NgModule({
  declarations: [
    PartnerComponent,
    HomeComponent,
    AddRestaurantFormComponent,
    DashboardComponent,
    MenuMangementComponent,
    AddDishComponent,
    ViewDishComponent

  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,


    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatSelectModule
  ]
})
export class PartnerModule { }
