import { CiudadInterface } from './../../models/ciudad';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { AgmCoreModule, AgmMap} from '@agm/core';
import { NgForm } from '@angular/forms';
import { DataItemService } from '../../services/data-item.service';


@Component({
  selector: 'app-modal-city',
  templateUrl: './modal-city.component.html',
  styleUrls: ['./modal-city.component.css']
})
export class ModalCityComponent implements OnInit {

  latlng = '14.810748,-86.771589';
  locationChosen = false;
  location;
  // link='https://maps.google.com/?ll='+this.latlng+'&z=7&t=m&output=embed';
  // @ViewChild('map', {static: false}) myMap: AgmMap;
  opcionSelect = '';
  verSelect = '';
  cities: CiudadInterface[];
  ltln: string[];
  lt = '';
  ln = '';
  value = '';
  ciudad = null;
  pais = null;
  latitude = 14.810748;
  longitude = -86.771589;

  constructor(private dataCity: DataItemService) {

  }

  ngOnInit() {
    // this.getListCity();
  }

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

  onCloseItem(cityForm: NgForm): void {
    cityForm.resetForm();
  }
}
