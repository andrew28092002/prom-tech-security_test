import { Component, DoCheck, OnInit } from '@angular/core';
import items from './../../../assets/data/data.json';
import { TItem } from 'src/assets/types/item';
import { LocalService } from 'src/app/local.service';
import { genre } from 'src/assets/data/genre';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, DoCheck {
  value = '';
  items: TItem[] = items;
  favoriteItems: TItem[] = [];
  sortedByGenre: TItem[] = [];
  sortedFavoriteItemsByGenre: TItem[] = [];
  sortedBySearch: TItem[] = [];
  sortedFavoriteItemsBySearch: TItem[] = [];
  genreDict = genre;
  selectedGenre: string = 'all';
  search: string = '';

  constructor(private LocalStorage: LocalService) {}

  ngDoCheck(): void {
    this.sortByGenre();
    this.sortBySearch();
  }

  ngOnInit(): void {
    const dataFromStorage = this.LocalStorage.getData('favorite');

    if (dataFromStorage) {
      this.favoriteItems = JSON.parse(dataFromStorage);
    }
  }

  toggleFavoriteItem(film: TItem) {
    if (this.favoriteItems.filter((item) => item.id === film.id).length > 0) {
      this.favoriteItems = this.favoriteItems.filter(
        (item) => item.id !== film.id
      );
    } else {
      this.favoriteItems.push(film);
    }

    this.LocalStorage.saveData('favorite', JSON.stringify(this.favoriteItems));
  }

  checkIsFavorite(item: TItem) {
    return (
      this.favoriteItems.filter((favoriteItem) => favoriteItem.id === item.id)
        .length > 0
    );
  }

  sortByGenre() {
    if (this.selectedGenre !== 'all') {
      const sortedByGenre: TItem[] = [];

      this.items.forEach((item) => {
        const flag = item.genre.some(
          (genreNum) =>
            this.genreDict.get(genreNum) ===
            this.genreDict.get(Number(this.selectedGenre))
        );

        if (flag) {
          sortedByGenre.push(item);
        }
      });

      this.sortedByGenre = sortedByGenre;

      const sortedFavoriteByGenre: TItem[] = [];

      sortedByGenre.forEach((item) => {
        const flag = this.favoriteItems.some(
          (favoriteItem) => favoriteItem.id === item.id
        );

        if (flag) {
          sortedFavoriteByGenre.push(item);
        }
      });

      this.sortedFavoriteItemsByGenre = sortedFavoriteByGenre;
    } else {
      this.sortedByGenre = this.items;
      this.sortedFavoriteItemsByGenre = this.favoriteItems;
    }
  }

  sortBySearch() {
    if (this.search.trim() !== '') {
      const sortedBySearch: TItem[] = [];

      this.sortedByGenre.forEach((item) => {
        const flag = item.name
          .toLowerCase()
          .includes(this.search.trim().toLowerCase());

        if (flag) {
          sortedBySearch.push(item);
        }
      });

      this.sortedBySearch = sortedBySearch;

      const sortedFavoriteBySearch: TItem[] = [];

      sortedBySearch.forEach((item) => {
        const flag = this.sortedFavoriteItemsByGenre.some(
          (favoriteItem) => favoriteItem.id === item.id
        );

        if (flag) {
          sortedFavoriteBySearch.push(item);
        }
      });

      this.sortedFavoriteItemsBySearch = sortedFavoriteBySearch;
    } else {
      this.sortedBySearch = this.sortedByGenre;
      this.sortedFavoriteItemsBySearch = this.sortedFavoriteItemsByGenre;
    }
  }
}
