import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { MainComicComponent } from './main-comic/main-comic.component';


const routes: Routes = [
  { path: 'homepage', component: MainComicComponent},
  { path: "admin", component: AdminComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
