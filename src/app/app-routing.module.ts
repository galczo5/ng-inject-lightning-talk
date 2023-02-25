import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UseHostBindingComponent} from "./examples/use-host-binding/use-host-binding.component";
import {UseHostListenComponent} from "./examples/use-host-listen/use-host-listen.component";
import {UseOnChangesComponent} from "./examples/use-on-changes/use-on-changes.component";
import {UseOnDestroyComponent} from "./examples/use-on-destroy/use-on-destroy.component";
import {UseZonelessHostListenComponent} from "./examples/use-zoneless-host-listen/use-zoneless-host-listen.component";
import {InfoComponent} from "./examples/info/info.component";

const routes: Routes = [
  {
    path: 'useHostBinding',
    component: UseHostBindingComponent
  },
  {
    path: 'useHostListen',
    component: UseHostListenComponent
  },
  {
    path: 'useOnChanges',
    component: UseOnChangesComponent
  },
  {
    path: 'useOnDestroy',
    component: UseOnDestroyComponent
  },
  {
    path: 'useZonelessHostListen',
    component: UseZonelessHostListenComponent
  },
  {
    path: '',
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
