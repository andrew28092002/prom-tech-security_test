import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: 'modal-dialog.html',
  styleUrls: ['modal-dialog.scss'],
})
export class ModelDialogComponent {
  isFavorite: boolean;
  item: TItem;
  haveChange: boolean = false

  constructor(public dialogRef: MatDialogRef<ModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [TItem, boolean]
  ) {
    this.item = data[0]
    this.isFavorite = data[1]
  }

  reverseGenre() {
    return [...this.item.genre].map((num) => genre.get(num)).join(', ');
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite
    this.haveChange = !this.haveChange
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
