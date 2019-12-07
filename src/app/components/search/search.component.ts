import { LogInterface } from './../../models/login';
import { Component, OnInit } from '@angular/core';
import { DataItemService } from '../../services/data-item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  latitude = 14.0818005;
  longitude = -87.20681;

  constructor(private dataLog: DataItemService) { }
  public logs: LogInterface[];
  public logs1: LogInterface;
  public lat;
  public lng;
  locationChosen = false;

  ngOnInit() {
    this.getOneLog();
    console.log(this.logs1);
  }

  updateLat() {
    if (this.dataLog.selectedLog.code != null) {
      this.latitude = parseFloat(this.dataLog.selectedLog.lat);
    }
    return this.latitude;
  }

  updateLng() {
    if (this.dataLog.selectedLog.code != null) {
      this.longitude = parseFloat(this.dataLog.selectedLog.lng);
    }
    return this.longitude;
  }
  asignar() {
    this.latitude = parseFloat(this.dataLog.selectedLog.lat);
    this.longitude = parseFloat(this.dataLog.selectedLog.lng);
    console.log('lat', this.latitude, 'lng', this.longitude);
  }

  getOneLog() {

    const code_item = 'BQL9gV';

    // const code_item = this.dataLog.selectedLog.code;
    this.dataLog.getOneLog('log', ref => ref.where('codeItem', '==', code_item)
      .orderBy('date', 'desc'))
      .subscribe(response => {
        this.logs = response;
        this.logs1 = this.logs[0];
        console.log('Array', this.logs[0].lat, ' ', this.logs[0].lng);
        this.latitude = parseFloat(this.logs[0].lat);
        this.longitude = parseFloat(this.logs[0].lng);
        this.locationChosen = true;
        return this.logs1;
      });
  }

}
