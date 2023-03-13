import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';
import { MatIconButton } from '@angular/material/button';
import { LocalService } from 'src/app/local.service';
import { MatDialog } from '@angular/material/dialog';
import { ModelDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: TItem;
  @Output() likeClick = new EventEmitter();
  genre: Map<number, string> = genre;
  isFavorite: boolean = false;

  constructor(private LocalStorage: LocalService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.checkIsFavorite();
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
    this.LocalStorage.toggleFavoriteItem('favorite', this.item);
    this.likeClick.emit(this.item)
    this.checkIsFavorite()
  }


  openDialog() {
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      data: [this.item, this.isFavorite],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.onClick()
      }
    });
  }

  checkIsFavorite() {
    const dataFromStorage = this.LocalStorage.getData('favorite');

    if (dataFromStorage) {
      const favoriteItems = JSON.parse(dataFromStorage);

      this.isFavorite =
        favoriteItems.filter((item: TItem) => item.id === this.item.id).length >
        0;
    }
  }
}
