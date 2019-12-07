import { Component, OnInit } from '@angular/core';
import { DataItemService } from '../../services/data-item.service';
import { ItemInterface } from '../../models/item';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private dataItem: DataItemService, private authService: AuthService) { }
  private items: ItemInterface[];

  ngOnInit() {
    this.getListItems();
  }

  getListItems(): void {
    this.dataItem.getAllItem()
      .subscribe(items => {
        this.items = items;
    });
  }

  onDeleteItem(idItem: string): void {
    const confirmacion = confirm('¿Está seguro que quiere borrar este elemento?');
    if (confirmacion) {
      this.dataItem.deleteItem(idItem);
    }
  }
  onUpdateItem(item: ItemInterface) {
    this.dataItem.selectedItem = Object.assign({}, item);
  }
}
