import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { ArchiveComponent } from './archive/archive.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MainComicComponent } from './main-comic/main-comic.component';


const routes: Routes = [
  { path: 'homepage', component: MainComicComponent },
  { path: 'homepage/:issue', component: MainComicComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "archive", component: ArchiveComponent },
  { path: "login", component: LoginComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
