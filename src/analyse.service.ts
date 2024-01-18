import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChartDataItem } from './models/ChartDataItem';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  constructor(private httpClient: HttpClient) { }



  getAll(): Observable<{ data: ChartDataItem[] }> {
    return (this.httpClient.get<{ data: ChartDataItem[] }>('https://localhost:7185/api/CubeData/query1'));
  }
}
