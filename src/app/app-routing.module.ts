import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComicComponent } from './main-comic/main-comic.component';


const routes: Routes = [
  { path: 'homepage', component: MainComicComponent},
  { path: "admin", component: AdminComponent},
  { path: "edit/:postId", component: AdminComponent},
  { path: "archive", component: ArchiveComponent},
  { path: "login", component: LoginComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
