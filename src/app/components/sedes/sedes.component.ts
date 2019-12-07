import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataItemService } from '../../services/data-item.service';
import { CiudadInterface } from '../../models/ciudad';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  constructor(private dataCity: DataItemService, private authService: AuthService) { }
  private cities: CiudadInterface[];


  ngOnInit() {
    this.getListCity();

  }
  getListCity(): void {
    this.dataCity.getAllCity()
      .subscribe(city => {
        this.cities = city;
      });
  }
  onDeletcity(idCity: string): void {
    const confirmacion = confirm('¿Está seguro que quiere borrar el registro?');
    if (confirmacion) {
      this.dataCity.deleteCity(idCity);
    }
  }
  onUpdateCity(ciudad: CiudadInterface) {
    this.dataCity.selectedCiudad = Object.assign({}, ciudad);
    this.dataCity.selectedCiudad.lat = ciudad.lat;
    this.dataCity.selectedCiudad.lng = ciudad.lng;
  }

}
