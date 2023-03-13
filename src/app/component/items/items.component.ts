import { Component } from '@angular/core';
import items from './../../../assets/data/data.json';
import { TItem } from 'src/assets/types/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  value = '';
  items: TItem[] = items;
}
