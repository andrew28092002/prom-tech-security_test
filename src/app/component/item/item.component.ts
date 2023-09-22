import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/assets/types/item';
import { genres } from 'src/assets/data/genre';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModelDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent{ 
  @Input() item: Item;
  @Output() addToFavorite: EventEmitter<Item> = new EventEmitter<Item>()

  constructor(private dialog: MatDialog) {}

  get isFavorite(){
    return this.item.isFavorite
  }

  reverseGenre() {
    return [...this.item.genre].map((num) => genres[num]).join(', ');
  }

  onMouseEnter(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '1';
  }

  onMouseLeave(button: MatIconButton) {
    button._elementRef.nativeElement.style.opacity = '0';
  }

  onClick() {
    this.addToFavorite.emit(this.item)
  }


  openDialog() {
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      data: [this.item, this.item.isFavorite],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.onClick()
      }
    });
  }

  
}
