import { OnboardPanelComponent } from './components/onboard-panel/onboard-panel.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  component:AdminComponent,
  children:[
    {path:'onboard',component:OnboardPanelComponent},
    {path:'',redirectTo:'/admin/onboard',pathMatch:'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
