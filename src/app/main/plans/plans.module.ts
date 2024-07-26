import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans/plans.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: PlansComponent,
    data: { animation: 'sample' }
  },
]

@NgModule({
  declarations: [
    PlansComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PlansModule { }
