import { Component, OnInit } from '@angular/core';
import { IAccLoadedEventArgs, ChartTheme,  } from '@syncfusion/ej2-angular-charts'
import { Browser } from '@syncfusion/ej2-base';
import { DataService } from '../services/data.service';
import * as _ from "lodash";
import { parse } from 'path';

export interface Cars {
  createdAt: string
  car: string
  price: number
  id: string
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit { 
public tooltip: Object = {
    enable: true
};

public legend: Object = {
    visible: true,
    enableHighlight : true
}
// custom code start
public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
};
// custom code end
public circleMarker: Object = { visible: true, height: 7, width: 7 , shape: 'Circle' , isFilled: true };
public startAngle: number = 0;
public endAngle: number = 360;
public title_V: string = 'Car Prices';


  constructor(
    private ds: DataService,
  ) { }

  ngOnInit(): void {
    this.PullCars();
  }
  priceP!: number;
  CarsInfo: Object[] = []
  PullCars(){
    this.ds.getCars().subscribe((data:Cars[]) =>{ 
        for (let i = 0; i < data[i].price; i++) {
            this.priceP = data[i].price = parseFloat(data[i].price!.toString());
            this.CarsInfo = data;
        }
      });
  }
}
