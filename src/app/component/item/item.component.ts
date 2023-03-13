import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';
import { MatIconButton } from '@angular/material/button';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit{
  @Input('item') item: TItem;
  @Output('toggleFavoriteButton') click = new EventEmitter();
  genre: Map<number, string> = genre;
  isFavorite: boolean = false

  constructor(private LocalStorage: LocalService) {}
  ngOnInit(): void {
    this.checkIsFavorite()
  }

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
    this.click.emit(this.item);
  }

  checkIsFavorite() {
    const dataFromStorage = this.LocalStorage.getData('favorite');

    if (dataFromStorage) {
      const favoriteItems = JSON.parse(dataFromStorage);

      this.isFavorite = favoriteItems.filter(
        (item: TItem) => item.id === this.item.id
      ).length > 0;
    }
  }
}
