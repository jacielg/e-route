import { LogInterface } from './../../models/login';
import { Component, OnInit } from '@angular/core';
import { DataItemService } from '../../services/data-item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  latitude = 14.0818005;
  longitude = -87.20681;
  zoom = 5;

  constructor(private dataLog: DataItemService) { }
  public logs: LogInterface[];
  public logs1: LogInterface;
  public lat;
  public lng;
  locationChosen = false;

  ngOnInit() {
    this.getOneLog();
  }

  getOneLog() {
    var code_item;
    if (this.dataLog.selectedLog.code === null) {
      code_item = 'D001';
    } else {
      code_item = this.dataLog.selectedLog.code;
    }
    console.log('Code Parameters', code_item);
    console.log('code', code_item, 'lat',this.latitude, 'lng', this.longitude);
    this.dataLog.getOneLog('log', ref => ref.where('codeItem', '==', code_item)
      .orderBy('date', 'desc')).subscribe(response => {
        this.logs = response;
        this.logs1 = this.logs[0];
        console.log('Array', this.logs[0].lat, ' ', this.logs[0].lng);
        this.latitude = parseFloat(this.logs[0].lat);
        this.longitude = parseFloat(this.logs[0].lng);
        if (this.dataLog.selectedLog.code === null) {
          this.locationChosen = false;
        } else {
          this.locationChosen = true;
          this.zoom = 12;
        }
        return this.logs1;
      });
  }

}
