import { CiudadInterface } from '../../models/ciudad';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataItemService } from '../../services/data-item.service';


@Component({
  selector: 'app-modal-city',
  templateUrl: './modal-city.component.html',
  styleUrls: ['./modal-city.component.css']
})
export class ModalCityComponent implements OnInit {
  locationChosen = false;
  verSelect = '';
  cities: CiudadInterface[];
  value = '';
  latitude = 14.810748;
  longitude = -86.771589;

  constructor(private dataCity: DataItemService) { }

  ngOnInit() { }

  updateLat() {
    if (this.dataCity.selectedCiudad.id != null) {
      this.latitude = parseFloat(this.dataCity.selectedCiudad.lat);
    }
    return this.latitude;
  }

  updateLng() {
    if (this.dataCity.selectedCiudad.id != null) {
      this.longitude = parseFloat(this.dataCity.selectedCiudad.lng);
    }
    return this.longitude;
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    this.dataCity.selectedCiudad.lat = this.latitude.toString();
    this.dataCity.selectedCiudad.lng = this.longitude.toString();
  }

  onSaveCity(cityForm: NgForm): void {
    console.log(this.dataCity.selectedCiudad);
    if (cityForm.value.id === null) {
      this.dataCity.addCity(cityForm.value);
    } else {
      this.dataCity.updateCity(cityForm.value);
    }
    cityForm.resetForm();
  }

  onCloseItem(cityForm: NgForm): void {
    cityForm.resetForm();
  }
}
