import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//material modules imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

//components imports
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnboardPanelComponent } from './components/onboard-panel/onboard-panel.component';
import { ViewRestaurantDetailsComponent } from './components/view-restaurant-details/view-restaurant-details.component';


@NgModule({
  declarations: [
    AdminComponent,
    OnboardPanelComponent,
    ViewRestaurantDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    //material modules
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule

  ]
})
export class AdminModule { }
