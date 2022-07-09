import { CardField } from './../../../../_models/shared/card-field';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-listing-card',
  templateUrl: './item-listing-card.component.html',
  styleUrls: ['./item-listing-card.component.sass']
})
export class ItemListingCardComponent implements OnInit {
  @Input()fields: CardField[] | undefined;
  @Input()hasAvatar: boolean | undefined;
  @Input()sideAvatar: boolean | undefined;
  @Input()item: any;
  @Output()fieldClicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.fields?.sort((a, b) => a.order - b.order);
  }

  onFieldClick(fieldTitle: string){
    this.fieldClicked.emit(fieldTitle);
  }
}
