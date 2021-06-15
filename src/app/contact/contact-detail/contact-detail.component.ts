import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CData } from 'src/app/service/contact.model';

import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  datas:CData;
  id:number=0;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getPost(id).subscribe(post => this.datas = post);
  } 
}
