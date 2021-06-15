import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CData } from 'src/app/service/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    headers = ["ID", "Name", "Email", "Contact", "Action"];
    datas: CData[];
    currentData: CData = {
      id: 0,
      name: '',
      email: '',
      phone:''
    }
    @Output() sendData = new EventEmitter();
    @Output() totalid = new EventEmitter();
    isEdit: boolean = false;
    id:number;
    subscription: Subscription

  constructor(private contactServe: ContactService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){ 
    this.getAllData();
    this.subscription = this.contactServe.dataChanged.subscribe(
      (datas: CData[]) => {
        this.datas = datas;
      })
  }

  getAllData(){
      this.contactServe.getData().subscribe(res=>{
      this.datas = res;
    })
  }
  
  onDelete(data: any){
    this.contactServe.deleteData(data.id)
    .subscribe(res=>{
      alert("Contact Deleted")
      this.getAllData();
    })
  }

  onsendData(data: any){
    this.sendData.emit(data);      
    this.getAllData();  
    }
}


