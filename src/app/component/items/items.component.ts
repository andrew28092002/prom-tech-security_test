import { Component, DoCheck, OnInit } from '@angular/core';
import items from './../../../assets/data/data.json';
import { LocalService } from 'src/app/services/local.service';
import { genres } from 'src/assets/data/genre';
import { ItemService } from 'src/app/services/items.service';
import { Item } from 'src/assets/types/item';
import { MatSelectChange } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  value = '';
  items: Item[] = [];
  favoriteItems: Item[] = []
  genres = genres
  search: string = ''

  constructor(
    private ItemsService: ItemService,
  ) {
  }

  ngOnInit(): void {
    this.items = this.ItemsService.items
    this.favoriteItems = this.ItemsService.favoriteItems
  }
 
  addToFavorite(item: Item) {
    console.log('run')
    this.ItemsService.like(item)
  }

  sortBySearch(event: Event) {
    const search = (event.target as HTMLInputElement).value
    console.log(search)
    if (this.search) {
      this.items = this.ItemsService.items.filter(i => i.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      this.favoriteItems = this.ItemsService.favoriteItems.filter(i => i.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    } else {
      this.items = this.ItemsService.items
      this.favoriteItems = this.ItemsService.favoriteItems
    }
  }

  sortByGenre(event: MatSelectChange) {
    const genre = parseInt(event.value)
    if (genre) {
      this.items = this.ItemsService.items.filter(i => i.genre.includes(genre))
      this.favoriteItems = this.ItemsService.favoriteItems.filter(i => i.genre.includes(genre))
    } else {
      this.items = this.ItemsService.items
      this.favoriteItems = this.ItemsService.favoriteItems
    }
  }
}
