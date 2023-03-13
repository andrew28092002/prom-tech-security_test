import { Component, Input } from '@angular/core';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';
import { MatIconButton } from '@angular/material/button';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('item') item: TItem;
  genre: Map<number, string> = genre;

  constructor(private LocalStorage: LocalService) {}

  reverseGenre() {
    return [...this.item.genre].map((num) => this.genre.get(num)).join(', ');
  }

  onMouseEnter(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '1';
  }

  onMouseLeave(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '0';
  }

  onClick() {
    const prevData = this.LocalStorage.getData('favourite');

    if (prevData) {
      const parsedData = JSON.parse(prevData);

      if (parsedData.includes(this.item.id)) {
        const updatedData = parsedData.filter(
          (id: number) => id !== this.item.id
        );

        updatedData.length > 0
          ? this.LocalStorage.saveData('favourite', JSON.stringify(updatedData))
          : this.LocalStorage.removeData('favourite');
      } else {
        this.LocalStorage.saveData('favourite', JSON.stringify([...parsedData, this.item.id]));
      }
    } else {
      this.LocalStorage.saveData('favourite', JSON.stringify([this.item.id]));
    }
  }
}
