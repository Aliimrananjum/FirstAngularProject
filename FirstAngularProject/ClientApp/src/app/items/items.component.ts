import { Component, OnInit } from '@angular/core';
import { IItem } from './item'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items-component',
  templateUrl: './items.component.html',
  styleUrls:['./items.component.css']
})

export class ItemsComponent implements OnInit{
  displayImage: boolean = true;
  viewTitle: string = 'Table';
  items: IItem[] = [];

  constructor(private _http: HttpClient) {

  }
  //listFilter: string = '';

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter', value);
    this.filteredItems = this.performFilter(value)
  }

  getItems(): void {
    this._http.get<IItem[]>("api/item/").subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.items = data;
      this.filteredItems = this.items;
    })
  }


  /*
  items: IItem[] = [
    {
      "ItemId": 1,
      "Name": "Pizza",
      "Price": 150,
      "Description": "Delicious Italian dish with a thin crust topped with tomato sauce, cheese, and various toppings.",
      "ImageUrl": "assets/images/pizza.jpg"
    },
    {
      "ItemId": 2,
      "Name": "Fried Chicken Leg",
      "Price": 20,
      "Description": "Crispy and succulent chicken leg that is deep-fried to perfection, often served as a popular fast food item.",
      "ImageUrl": "assets/images/chickenleg.jpg"
    }
  ];
   */

  filteredItems: IItem[] = this.items;

  performFilter(filterBy: string): IItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.items.filter((item: IItem) => item.Name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  ngOnInit(): void {
    console.log('ItemsComponent created')
  }
 

}
