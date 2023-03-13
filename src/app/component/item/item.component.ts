import { Component, Input } from '@angular/core';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('item') item: TItem;
  genre: Map<number, string> = genre;

  reverseGenre() {
    return [...this.item.genre].map((num) => this.genre.get(num)).join(', ');
  }

  onMouseEnter(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '1'
  }

  onMouseLeave(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '0'
  }
}
