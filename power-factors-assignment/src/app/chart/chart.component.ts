import { Component, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'pf-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() data: Array<any>;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() secondaryValueField: string;
  @Input() title: string;

  @ViewChild(HighchartsChartComponent) chart: HighchartsChartComponent;

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!(this.data.length > 0)) { return; }

    const total = this.data.reduce((acc, curr) => acc + curr[this.valueField], 0);
    const data = this.data?.map((record => {
      return {
        name: record[this.textField],
        y: record[this.valueField],
        percentage: (record[this.valueField] / total).toFixed(2),
        secondary: record[this.secondaryValueField].join(', ')
      }
    }));

    this.chartOptions = {
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadCSV'],
          },
        },
      },
      chart: {
        type: 'pie'
      },
      title: {
        text: this.title
      },
      tooltip: {
        pointFormat:'Percentage: {point.percentage}%<br/>{point.secondary}'
      },
      series: [
        {
          type: 'pie',
          name: 'Films',
          data
        }
      ]
    };
  }

  downloadFile() {
    const total = this.data.reduce((acc, curr) => acc + curr[this.valueField], 0);
    const dataset = this.data?.map((record => {
      return {
        name: record[this.textField],
        value: record[this.valueField],
        percentage: (record[this.valueField] / total).toFixed(2),
        [this.secondaryValueField]: record[this.secondaryValueField].join(', ')
      }
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataset);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    fileSaver.saveAs(data, 'Character.xlsx');
  }

}
