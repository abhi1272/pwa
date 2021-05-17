import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public filterObj = { filters: [] }
  public downlodObj =
    { export_to_excel: true }
  public roleName
  public roleAttributes
  public filterDataCountDisplay
  public helpRoleName
  public previousUrlData = {
    url: '',
    gadgetTitle: ''
  }
  public apiUrl = environment.url
  apiDetails
  previousFilter
  timeTableEditData
  checkedColumns = []

  constructor(public http: HttpClient) { }

  getTableConfig(key): Observable<any> {
    return this.http.get(`${this.apiUrl}/design?page_key=${key}`)
  }

  getTableData(api, filter): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}?paql=${filter}`)
  }

  getApiFilteredData(api, filter): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}?paql=${filter}`)
  }
  // getTableMetaConfig(options) {
  //   return this.http.get('../../assets/sample.json')
  // }

  // getApiFilteredData(api_details, filter) {
  //   // return this.http.get(`
  //   // ${this.config.apiUrl}${api_details.api_url}?faql=${filter}`,this.httpOptions);
  //   return this.http.get('../../assets/sample-data.json')
  // }

  // getDataFromConfig(api_details, filter) {
  //   // return this.http.get(`
  //   // ${this.config.apiUrl}${api_details.api_url}?faql=${filter}`,this.httpOptions);
  //   return this.http.get('../../assets/sample-data.json')
  // }
}
