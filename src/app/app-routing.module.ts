import { NgModule } from "@angular/core";
import { ChildrenOutletContexts, Router, RouterModule, Routes} from "@angular/router";
import { ContactDetailComponent } from "./contact/contact-detail/contact-detail.component";

import { ContactComponent } from "./contact/contact-form/contact.component";
import { PagenotfoundComponent } from "./page.not.found.component";


const appRoutes: Routes = [
    {path:'', redirectTo: "/home", pathMatch: 'full' },
    {path:'home', component: ContactComponent},
    {path:'add', component: ContactComponent},
    { path:'view/:id', component: ContactDetailComponent},
 
    
    //  {path: ':id/edit', component: ContactEditComponent},
     {path: '**' , component: PagenotfoundComponent }
   

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}