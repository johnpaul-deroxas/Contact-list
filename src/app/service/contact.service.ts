import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { map } from "rxjs/operators";
import { CData } from "./contact.model";

@Injectable()
export class ContactService{
    dataChanged = new Subject<CData[]>();
    datas:CData[]=[];
    jsonURL: string = "http://localhost:3000/posts";

constructor(private http: HttpClient){

}
getPost(id: number) :Observable<CData> {
  const url = `${this.jsonURL}/${id}`;

  return this.http.get<CData>(url);
}
    postData(data: any){
      return this.http.post<any>(this.jsonURL, data)
      .pipe(map((res:any)=>{
        return res;
      }))
}

    getData() {
      return this.http.get<any>(this.jsonURL)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    updateData(data: any, id: number) {
      return this.http.put<any>("http://localhost:3000/posts/"+id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    deleteData(id: number) {
      return this.http.delete<any>("http://localhost:3000/posts/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
    } 
}



