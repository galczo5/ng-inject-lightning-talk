import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UseHostBindingComponent } from './examples/use-host-binding/use-host-binding.component';
import { UseHostListenComponent } from './examples/use-host-listen/use-host-listen.component';
import {UseOnChangesComponent, UseOnChangesComponentChild} from './examples/use-on-changes/use-on-changes.component';
import { UseOnDestroyComponent } from './examples/use-on-destroy/use-on-destroy.component';
import { UseZonelessHostListenComponent } from './examples/use-zoneless-host-listen/use-zoneless-host-listen.component';
import { InfoComponent } from './examples/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    UseHostBindingComponent,
    UseHostListenComponent,
    UseOnChangesComponent,
    UseOnChangesComponentChild,
    UseOnDestroyComponent,
    UseZonelessHostListenComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
