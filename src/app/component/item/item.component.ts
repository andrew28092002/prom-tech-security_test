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
export class ItemComponent{
  @Input() item: TItem;
  @Input() isFavorite: boolean;
  @Output() likeClick = new EventEmitter();
  genre: Map<number, string> = genre;

  constructor(private LocalStorage: LocalService, private dialog: MatDialog) {}

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
    // this.checkIsFavorite()
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

  
}
