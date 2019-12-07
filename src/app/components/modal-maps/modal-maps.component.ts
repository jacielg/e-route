import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { CiudadInterface } from '../../models/ciudad';
import { DataItemService } from '../../services/data-item.service';
import { NgForm } from '@angular/forms';
import { formatDate} from '@angular/common';

@Component({
  selector: 'app-modal-maps',
  templateUrl: './modal-maps.component.html',
  styleUrls: ['./modal-maps.component.css']
})

export class ModalMapsComponent implements OnInit {

  latitude = 14.810748;
  longitude = -86.771589;
  @ViewChild('map', {static: false}) myMap: AgmMap;
  verSelect = '';
  cities: CiudadInterface[];
  valuedate;
  today = new Date();
  jstoday = '';

  constructor(private dataCity: DataItemService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0600');
    this.valuedate = this.jstoday;
    console.log('Fecha Actual', this.jstoday);
  }

  ngOnInit() {
    this.fecha();
    this.getListCity();
  }

  fecha() { }

  onSaveLog(cityForm: NgForm): void {
    console.log(cityForm.value);
    this.dataCity.addLog(cityForm.value);
    this.dataCity.selectedItem.ubiActual = this.verSelect;
    this.dataCity.updateItem(this.dataCity.selectedItem);
  }

  capturar() {
    this.verSelect = this.dataCity.selectedCiudad.ciudad;
    console.log(this.verSelect);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ciudad === this.verSelect) {
        console.log('encontrado', this.cities[i].ciudad);
        this.latitude = parseFloat(this.cities[i].lat);
        this.longitude = parseFloat(this.cities[i].lng);
      }
    }
  }

  getListCity(): void {
    this.dataCity.getAllCity().subscribe(city => {
      this.cities = city;
      console.log(this.cities[0]);
      console.log(this.cities[1]);
    });
  }

  onClose(cityForm: NgForm) {
    cityForm.resetForm();
  }
}
