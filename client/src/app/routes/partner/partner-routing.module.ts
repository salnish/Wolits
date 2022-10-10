import { MenuMangementComponent } from './components/menu-mangement/menu-mangement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { HomeComponent } from './components/home/home.component';
import { PartnerComponent } from './partner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  component:PartnerComponent,
  children:[
    {path:'home',component:HomeComponent},
    {path:'addRestaurant',component:AddRestaurantFormComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'menuManage',component:MenuMangementComponent},
    { path: '', redirectTo: '/partner/home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
