import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Chart, { ChartItem, ChartTypeRegistry } from 'chart.js/auto';
import { ChatbotService } from '../services/chatbot.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chatbot-analytcs',
  templateUrl: './chatbot-analytcs.component.html',
  styleUrls: ['./chatbot-analytcs.component.css']
})
export class ChatbotAnalytcsComponent {
  chartTypeOptions: string[] = ['bar', 'pie', 'line'];
  dataSourceOptions: any[] = [];
  selectedChart!: string;
  analytics$!: Observable<any>;
  selectedDataSource!: string;
  chart!: any;

  dataSourceControl:FormControl = new FormControl('', {validators: [Validators.required]});
  chartSelectControl:FormControl = new FormControl('',{validators: [Validators.required]});

  constructor(private titleService: Title, private chatbotService: ChatbotService){}

  ngOnInit(){
    this.titleService.setTitle("Analytics | TechTalk");

    let obj = {key: 'mostCommonResponse', name: 'Most Common Response'};
    this.dataSourceOptions.push(obj);

    obj = {key: 'leastCommonResponse', name: 'Least Common Response'};
    this.dataSourceOptions.push(obj);

    obj = {key: 'mostCommonPatterns', name: 'Most Common Patterns'};
    this.dataSourceOptions.push(obj);

    obj = {key: 'leastCommonPatterns', name: 'Least Common Patterns'};
    this.dataSourceOptions.push(obj);

    this.buildDummyChart()
  }

  onDataSourceSelectChange(){
    this.onConfigChange();
  }

  onChartSelectChange(){
    this.onConfigChange();
  }

  onConfigChange(){
    const labels: any[] = [];
    const data: any[] = [];

    if(this.dataSourceControl.valid && this.chartSelectControl.valid){
      this.chatbotService.postAnalytics(this.dataSourceControl.value).subscribe((response: any) => {
        console.log(response);
        if(response.res.length > 3){
          response.res.forEach((element:any)=> {
            labels.push(element[0]);
            data.push(element[1]);
            console.log(element);
          });
        }

        else{
          response.res[0].forEach((element:any) => {
            labels.push(element);
          });

          response.res[1].forEach((element: any) => {
            data.push(element)
          })
        }

        this.buildChart(this.chartSelectControl.value, labels,data);
      });
    }
  }

  buildChart(chartType: any, labels: any[], data: any[]){
    const ctx = document.getElementById('myChart') as ChartItem;

    if(this.chart){
      this.chart.destroy();
    }

    if(ctx != null){
      this.chart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
            label: '',
            data: data,
            borderWidth: 1
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  buildDummyChart(){
    const ctx = document.getElementById('myChart') as ChartItem;
    const labelsStr = []

                /*
            {
            label: 'Custom Model - DatasetV2 (accuracy)',
            data: [0.5753, 0.7137, 0.8096, 0.8370, 0.8356, 0.9027, 0.8932, 0.9041, 0.9397],
            borderWidth: 1
            },
            {
              label: 'Custom Model - DatasetV4 (accuracy)',
              data: [0.9342, 0.9493, 0.9534, 0.9644, 0.9740, 0.9740, 0.9740, 0.9767, 0.9767, 0.9712, 0.9767],
              borderWidth: 1
            },
            {
              label: 'EfficientNET - DatasetV1 (accuracy)',
              data: [0.7041, 0.8673, 0.9592, 0.9388, 0.9490, 0.9388, 0.9490, 1.0000, 0.9898, 0.9796, 0.9796, 0.9796, 0.9898, 0.9694, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000],
              borderWidth: 1
            },
            {
              label: 'EfficientNET - DatasetV2 (accuracy)',
              data: [0.8004, 0.8962, 0.9284, 0.9506, 0.9637, 0.9647, 0.9748, 0.9667, 0.9708, 0.9829, 0.9829, 0.9839, 0.9808, 0.9829, 0.9728, 0.9869, 0.9889, 0.9829, 0.9859, 0.9798, 0.9718, 0.9748, 0.9849],
              borderWidth: 1
            },
            {
              label: 'EfficentNET - DatasetV3 (accuracy)',
              data: [0.7671, 0.8781, 0.9329, 0.9342, 0.9438, 0.9466, 0.9301, 0.9767, 0.9493, 0.9685, 0.9890, 0.9685, 0.9767, 0.9562],
              borderWidth: 1
            },
            {
              label: 'EfficientNET - DatasetV4 (accuracy)',
              data: [0.7813, 0.8520, 0.8827, 0.9067, 0.9107, 0.9227, 0.9280, 0.9293, 0.9360],
              borderWidth: 1
            },
            {
              label: 'InceptionV3 - DatasetV1 (accuracy)',
              data: [0.59, 0.76, 0.85, 0.85, 0.94, 0.97, 0.99, 0.98, 0.99, 0.99, 0.99],
              borderWidth: 1
            },
            {
              label: 'InceptionV3 - DatasetV2 (accuracy)',
              data: [0.6158, 0.8043, 0.8648, 0.8760, 0.9119, 0.9119, 0.8955, 0.9221, 0.9426],
              borderWidth: 1
            },
            {
              label: 'InceptionV3 - DatasetV3 (accuracy)',
              data: [0.6493, 0.6781, 0.7781, 0.8521, 0.8685, 0.8616, 0.8767, 0.911, 0.9068, 0.8986, 0.9438, 0.9205, 0.8918, 0.8836, 0.8918, 0.9014, 0.8699, 0.8219], 
              borderWidth: 1
            },
            {
              label: 'InceptionV3 - DatasetV4 (accuracy)',
              data: [0.6972, 0.8264, 0.8292, 0.8694, 0.7861, 0.8347, 0.7986, 0.8208, 0.8875, 0.8639, 0.8583, 0.8653, 0.8875, 0.8764, 0.8875, 0.9, 0.8889, 0.9042, 0.9153, 0.9431, 0.8972, 0.8667, 0.9167, 0.9333, 0.9139, 0.9208],
              borderWidth: 1
            },
            {
              label: 'MobileNet - DatasetV1 (accuracy)',
              data: [0.53, 0.8, 0.84, 0.94, 0.87, 0.93, 0.91, 0.93, 0.94, 0.97, 0.99],
              borderWidth: 1
            },
            {
              label: 'MobileNet - DatasetV2 (accuracy)',
              data: [0.9314, 0.9570, 0.9549, 0.9652, 0.9734, 0.9816, 0.9990, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000],
              borderWidth: 1
            },
            {
              label: 'MobileNet - DatasetV3 (accuracy)',
              data: [0.7027, 0.8288, 0.8849, 0.9014, 0.9425, 0.9178, 0.9466, 0.9589, 0.9603, 0.9479, 0.9671, 0.9178, 0.9356, 0.9753, 0.9685, 0.9562, 0.9685, 0.9767, 0.9808, 0.9795, 0.9753, 0.9849, 0.9877, 0.9836, 0.9781, 0.9699, 0.9890, 0.9932, 0.9863, 0.9671, 0.9685],
              borderWidth: 1
            },
            {
              label: 'ResNet - DatasetV1 (accuracy)',
              data: [0.6735, 0.8878, 0.9388, 0.9592, 0.9592, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
              borderWidth: 1
            },
            {
              label: 'ResNet - DatasetV2 (accuracy)',
              data: [0.7603, 0.9137, 0.9301, 0.9712, 0.9589, 0.9822, 0.9548, 0.9863, 0.9890, 0.9808, 0.9932, 0.9781, 0.9945, 0.9918, 0.9863, 0.9973, 0.9863, 0.9932, 0.9877, 1.0000, 1.0000, 0.9986, 0.9932, 0.9932, 0.9918, 0.9808, 0.9918, 0.9945, 0.9890],
              borderWidth: 1
            },
            {
              label: 'ResNet - DatasetV4 (accuracy)',
              data: [0.9945, 0.9890, 0.9740, 0.9877, 0.9849, 0.9753, 0.9959, 0.9904, 0.9945],
              borderWidth: 1
            },
            {
              label: 'VGG19 - DatasetV3 (accuracy)',
              data: [0.9767, 0.9671, 0.9699, 0.9753, 0.9904, 0.9808, 0.9822, 0.9877, 0.9959, 0.9959, 0.9904, 0.9932, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9973, 0.9986, 0.9959, 0.9973],
              borderWidth: 1
            },
            {
              label: 'VGG19 - DatasetV1 (accuracy)',
              data: [0.58, 0.78, 0.97, 0.96, 0.97, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
              borderWidth: 1
            }
          ]
          */


    if(this.chart){
      this.chart.destroy();
    }

    const data: any = [
      
    ] 

    let max = 0
    data.forEach((element: any) => {
      if(element.data.length > max)
        max = element.data.length
    });

    for(let i=1; i<=max; i++){
      labelsStr.push(i.toString())
    }

    if(ctx != null){
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsStr,
          datasets: data
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}

