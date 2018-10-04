import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrickPageComponent } from './brick-page/brick-page.component';
import { BrickSearchPageComponent } from './brick-search-page/brick-search-page.component';
import { ClaimBrickFormPageComponent } from './claim-brick-form-page/claim-brick-form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    BrickPageComponent,
    BrickSearchPageComponent,
    ClaimBrickFormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
