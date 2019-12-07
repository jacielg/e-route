import { Component, OnInit } from '@angular/core';
import { DataItemService } from '../../services/data-item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {

  constructor(private dataApi: DataItemService) { }

  ngOnInit() {
  }

  onSaveItem(itemForm: NgForm): void {
    if (itemForm.value.id === null) {
      this.dataApi.addItem(itemForm.value);
    } else {
      this.dataApi.updateItem(itemForm.value);
    }
    itemForm.resetForm();
  }

  onCloseItem(itemForm: NgForm): void {
    itemForm.resetForm();
  }
}
