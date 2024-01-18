import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnalyseService } from 'src/analyse.service';
import { Chart } from 'chart.js';
import { ChartDataItem } from 'src/models/ChartDataItem';

@Component({
  selector: 'app-chart',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})

export class Chart1Component implements OnInit {
  chartData: ChartDataItem[] | undefined | null;

  constructor(private An: AnalyseService) { }

  ngOnInit(): void {
    this.getAll();
  }



  getAll() {
    this.An.getAll().subscribe(
      (data) => {
        console.log(data.data);
        this.chartData = data.data;
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  renderChart() {
    // Process data and render Chart.js chart
    if (this.chartData) {
      const labels = this.chartData.map(
        (item) => item['[Age Bands].[Age ID].[Age ID].[MEMBER_CAPTION]']
      );
      const values = this.chartData.map((item) => item['[Measures].[Sent]']);

      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sent',
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

  }
}

