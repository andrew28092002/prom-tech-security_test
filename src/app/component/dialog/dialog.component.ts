import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TItem } from 'src/assets/types/item';
import { genre } from 'src/assets/data/genre';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: 'modal-dialog.html',
  styleUrls: ['modal-dialog.scss'],
})
export class ModelDialogComponent implements OnInit{
  isFavorite: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: TItem,
    private LocalStorage: LocalService
  ) {}
  ngOnInit(): void {
    this.checkIsFavorite()
  }

  reverseGenre() {
    return [...this.item.genre].map((num) => genre.get(num)).join(', ');
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
