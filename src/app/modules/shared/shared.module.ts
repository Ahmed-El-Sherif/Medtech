import { AgePipe } from './_pipes/age.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListingCardComponent } from './components/item-listing-card/item-listing-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    ItemListingCardComponent,
    LoadingSpinnerComponent,
    AgePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemListingCardComponent,
    LoadingSpinnerComponent,
    AgePipe
  ]
})
export class SharedModule { }
