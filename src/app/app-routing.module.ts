import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from "./homepage/homepage.component";
import {BrickPageComponent} from "./brick-page/brick-page.component";
import {ClaimBrickFormPageComponent} from "./claim-brick-form-page/claim-brick-form-page.component";
import {BrickSearchPageComponent} from "./brick-search-page/brick-search-page.component";

const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'brick', component: BrickPageComponent},
    {path: 'brick/claim', component: ClaimBrickFormPageComponent},
    {path: 'search', component: BrickSearchPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
