import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup,    NgForm,    Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

import { CData } from 'src/app/service/contact.model';
import { ContactService } from 'src/app/service/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]
})
export class ContactComponent implements OnInit {
  @Output() newUser: EventEmitter<CData> = new EventEmitter();
  signupForm: FormGroup;
  alldata: any;
  cdataobj : CData = new CData();
  id: number;
  editMode=false;
  count:number = 0;
  
  constructor(private contactservice: ContactService,
              private http: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){ 
    this.signupForm = this.fb.group({
      id:[''],
      name:[''],
      email:[''],
      phone:['']
    })
    this.signupForm = new FormGroup({
        'id': new FormControl(null),
        'name': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null, [Validators.required])
      })   
  }

  onSubmit(){
    if(this.editMode){
      this.onUpdate()
    }else{
      this.onAdd()
  } 
}

onAdd(){
  this.cdataobj.id =  this.signupForm.value.id;
  this.cdataobj.name =  this.signupForm.value.name;
  this.cdataobj.email =  this.signupForm.value.email;
  this.cdataobj.phone =  this.signupForm.value.phone;
  this.contactservice.postData(this.cdataobj).subscribe(res =>{
    console.log("Contact Added");
    alert("Contact Added Succesfully!")
    this.signupForm.reset()
    let currentUrl = this.router.url;
    this.router.navigateByUrl('add', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    })
  },
  err=>{
    alert("Something went wrong");
  })
}

editData(data: any){
  this.editMode = true;
  this.cdataobj.id = data.id;
  this.signupForm.controls['id'].setValue(data.id);
  this.signupForm.controls['name'].setValue(data.name);
  this.signupForm.controls['email'].setValue(data.email);
  this.signupForm.controls['phone'].setValue(data.phone);
}

onUpdate(){
  this.cdataobj.id =  this.signupForm.value.id;
  this.cdataobj.name =  this.signupForm.value.name;
  this.cdataobj.email =  this.signupForm.value.email;
  this.cdataobj.phone =  this.signupForm.value.phone;
  this.contactservice.updateData(this.cdataobj, this.cdataobj.id).
  subscribe(res =>{
    alert("Contact Updated Succesfully!")
    this.signupForm.reset();
    this.editMode= false;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('add', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    })
  })
}

  cancel(){
     window.location.reload();
  }
}




